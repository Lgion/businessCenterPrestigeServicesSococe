import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';
import { createClerkClient } from '@clerk/astro/server';
import { getUserRole, getHardcodedAdminEmails, isHardcodedAdmin, type UserRole, type UserRoleRecord, POLE_OPTIONS } from '../../../utils/roles';

function getClerk() {
  const secretKey = (import.meta.env && import.meta.env.CLERK_SECRET_KEY) || ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.CLERK_SECRET_KEY) || process.env.CLERK_SECRET_KEY);
  if (!secretKey) throw new Error('CLERK_SECRET_KEY non configuré');
  return createClerkClient({ secretKey });
}

// GET : Liste de tous les utilisateurs et leurs rôles
export const GET: APIRoute = async ({ locals }) => {
  try {
    const auth = (locals as any).auth?.();
    const callerId = auth?.userId;

    if (!callerId) {
      return new Response(JSON.stringify({ error: 'Non authentifié. Connexion requise.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const clerk = getClerk();
    const caller = await clerk.users.getUser(callerId);
    const callerEmail = caller.emailAddresses.find(e => e.id === caller.primaryEmailAddressId)?.emailAddress
      || caller.emailAddresses[0]?.emailAddress || '';

    const callerRoleInfo = await getUserRole(callerEmail, callerId);
    if (callerRoleInfo.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Accès refusé. Rôle administrateur requis.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Récupérer les rôles enregistrés en base MongoDB
    const db = await getDb();
    const dbRoles = await db.collection<UserRoleRecord>('user_roles').find({}).toArray();
    const dbRolesMap = new Map<string, UserRoleRecord>();
    for (const r of dbRoles) {
      if (r.email) dbRolesMap.set(r.email.toLowerCase(), r);
    }

    // Récupérer la liste des utilisateurs enregistrés dans Clerk
    let clerkUsers: any[] = [];
    try {
      const clerkList = await clerk.users.getUserList({ limit: 100 });
      clerkUsers = clerkList.data || [];
    } catch (e) {
      console.warn('Impossible de récupérer la liste Clerk:', e);
    }

    const hardcodedAdmins = getHardcodedAdminEmails();

    // Consolider la liste complète des utilisateurs
    const usersMap = new Map<string, any>();

    // 1. D'abord ajouter tous les utilisateurs Clerk
    for (const u of clerkUsers) {
      const email = (u.emailAddresses.find((e: any) => e.id === u.primaryEmailAddressId)?.emailAddress 
        || u.emailAddresses[0]?.emailAddress || '').toLowerCase();
      if (!email) continue;

      const dbRecord = dbRolesMap.get(email);
      const isHardcoded = hardcodedAdmins.includes(email);

      let effectiveRole: UserRole = 'clients';
      let assignedPoles: string[] = [];
      let notes = '';

      if (isHardcoded) {
        effectiveRole = 'admin';
        assignedPoles = POLE_OPTIONS.map(p => p.id);
        notes = 'Super-Admin racine (.env)';
      } else if (dbRecord) {
        effectiveRole = dbRecord.role;
        assignedPoles = dbRecord.assignedPoles || [];
        notes = dbRecord.notes || '';
      } else if (u.publicMetadata?.role) {
        effectiveRole = u.publicMetadata.role as UserRole;
        assignedPoles = (u.publicMetadata.assignedPoles as string[]) || [];
      }

      usersMap.set(email, {
        userId: u.id,
        email,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username || email,
        imageUrl: u.imageUrl,
        role: effectiveRole,
        assignedPoles,
        notes,
        isHardcodedAdmin: isHardcoded,
        source: isHardcoded ? 'env' : dbRecord ? 'database' : 'clerk',
        createdAt: u.createdAt ? new Date(u.createdAt) : dbRecord?.createdAt || new Date(),
        updatedAt: dbRecord?.updatedAt || (u.updatedAt ? new Date(u.updatedAt) : new Date())
      });
    }

    // 2. Ajouter les utilisateurs configurés en base de données qui ne sont pas encore dans Clerk
    for (const [email, dbRecord] of dbRolesMap.entries()) {
      if (!usersMap.has(email)) {
        const isHardcoded = hardcodedAdmins.includes(email);
        usersMap.set(email, {
          userId: dbRecord.userId || null,
          email,
          name: dbRecord.name || email,
          imageUrl: null,
          role: dbRecord.role,
          assignedPoles: dbRecord.assignedPoles || [],
          notes: dbRecord.notes || '',
          isHardcodedAdmin: isHardcoded,
          source: 'database',
          createdAt: dbRecord.createdAt || new Date(),
          updatedAt: dbRecord.updatedAt || new Date()
        });
      }
    }

    // 3. Assurer que les hardcoded admins sont inclus
    for (const adminEmail of hardcodedAdmins) {
      if (!usersMap.has(adminEmail)) {
        usersMap.set(adminEmail, {
          userId: null,
          email: adminEmail,
          name: 'Super-Administrateur',
          imageUrl: null,
          role: 'admin',
          assignedPoles: POLE_OPTIONS.map(p => p.id),
          notes: 'Super-Admin racine (.env)',
          isHardcodedAdmin: true,
          source: 'env',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    const consolidatedUsers = Array.from(usersMap.values()).sort((a, b) => {
      // Priorité d'affichage : admin > poles > vip > clients
      const priority: Record<UserRole, number> = { admin: 0, poles: 1, vip: 2, clients: 3 };
      if (priority[a.role as UserRole] !== priority[b.role as UserRole]) {
        return priority[a.role as UserRole] - priority[b.role as UserRole];
      }
      return a.email.localeCompare(b.email);
    });

    return new Response(JSON.stringify({
      success: true,
      users: consolidatedUsers,
      hardcodedAdmins
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Erreur API GET /api/admin/roles:', err);
    return new Response(JSON.stringify({ error: err.message || 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST : Créer ou mettre à jour le rôle d'un utilisateur
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const auth = (locals as any).auth?.();
    const callerId = auth?.userId;

    if (!callerId) {
      return new Response(JSON.stringify({ error: 'Non authentifié. Connexion requise.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const clerk = getClerk();
    const caller = await clerk.users.getUser(callerId);
    const callerEmail = caller.emailAddresses.find(e => e.id === caller.primaryEmailAddressId)?.emailAddress
      || caller.emailAddresses[0]?.emailAddress || '';

    const callerRoleInfo = await getUserRole(callerEmail, callerId);
    if (callerRoleInfo.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Accès refusé. Rôle administrateur requis pour modifier les rôles.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { email, role, assignedPoles, notes, name, userId } = body;

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Adresse email requise.' }), { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const validRoles: UserRole[] = ['admin', 'poles', 'vip', 'clients'];
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: `Rôle invalide: ${role}. Valeurs acceptées: admin, poles, vip, clients` }), { status: 400 });
    }

    // Protection des comptes root
    if (isHardcodedAdmin(normalizedEmail) && role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Impossible de rétrograder un super-administrateur racine défini dans les variables d\'environnement.' }), { status: 400 });
    }

    const db = await getDb();
    const now = new Date();

    const roleDoc: Partial<UserRoleRecord> = {
      email: normalizedEmail,
      role,
      assignedPoles: role === 'poles' ? (assignedPoles || []) : (role === 'admin' ? POLE_OPTIONS.map(p => p.id) : []),
      notes: notes || '',
      updatedAt: now,
      updatedBy: callerEmail
    };

    if (name) roleDoc.name = name;
    if (userId) roleDoc.userId = userId;

    await db.collection('user_roles').updateOne(
      { email: normalizedEmail },
      { 
        $set: roleDoc,
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );

    // Mettre à jour Clerk publicMetadata si l'utilisateur existe dans Clerk
    let clerkUpdated = false;
    let targetUserId = userId;

    if (!targetUserId) {
      try {
        const matchingUsers = await clerk.users.getUserList({ emailAddress: [normalizedEmail] });
        if (matchingUsers.data && matchingUsers.data.length > 0) {
          targetUserId = matchingUsers.data[0].id;
        }
      } catch (e) {
        console.warn('Recherche utilisateur Clerk par email:', e);
      }
    }

    if (targetUserId) {
      try {
        await clerk.users.updateUserMetadata(targetUserId, {
          publicMetadata: {
            role,
            assignedPoles: roleDoc.assignedPoles
          }
        });
        clerkUpdated = true;
      } catch (e) {
        console.warn('Mise à jour métadonnées Clerk:', e);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Rôle "${role}" appliqué à ${normalizedEmail} avec succès.`,
      record: roleDoc,
      clerkSynced: clerkUpdated
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Erreur API POST /api/admin/roles:', err);
    return new Response(JSON.stringify({ error: err.message || 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE : Révoquer le rôle personnalisé d'un utilisateur (remet à 'clients')
export const DELETE: APIRoute = async ({ request, locals }) => {
  try {
    const auth = (locals as any).auth?.();
    const callerId = auth?.userId;

    if (!callerId) {
      return new Response(JSON.stringify({ error: 'Non authentifié' }), { status: 401 });
    }

    const clerk = getClerk();
    const caller = await clerk.users.getUser(callerId);
    const callerEmail = caller.emailAddresses.find(e => e.id === caller.primaryEmailAddressId)?.emailAddress
      || caller.emailAddresses[0]?.emailAddress || '';

    const callerRoleInfo = await getUserRole(callerEmail, callerId);
    if (callerRoleInfo.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Accès refusé' }), { status: 403 });
    }

    const url = new URL(request.url);
    const email = url.searchParams.get('email') || (await request.json().catch(() => ({})))?.email;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email requis' }), { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (isHardcodedAdmin(normalizedEmail)) {
      return new Response(JSON.stringify({ error: 'Impossible de supprimer un super-administrateur racine.' }), { status: 400 });
    }

    const db = await getDb();
    await db.collection('user_roles').deleteOne({ email: normalizedEmail });

    // Réinitialiser les métadonnées Clerk si possible
    try {
      const matchingUsers = await clerk.users.getUserList({ emailAddress: [normalizedEmail] });
      if (matchingUsers.data && matchingUsers.data.length > 0) {
        await clerk.users.updateUserMetadata(matchingUsers.data[0].id, {
          publicMetadata: { role: 'clients', assignedPoles: [] }
        });
      }
    } catch (e) {
      console.warn('Reset métadonnées Clerk:', e);
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Permissions personnalisées supprimées pour ${normalizedEmail}. Statut réinitialisé à Client.`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Erreur API DELETE /api/admin/roles:', err);
    return new Response(JSON.stringify({ error: err.message || 'Erreur serveur' }), { status: 500 });
  }
};
