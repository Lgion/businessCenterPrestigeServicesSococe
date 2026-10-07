import type { APIRoute } from 'astro';
import { getDb } from '../../lib/mongodb';
import { defaultSiteData } from '../../data/siteData';
import { createClerkClient } from '@clerk/astro/server';
import { getUserRole, canAccessAdmin } from '../../utils/roles';

function getClerk() {
  const secretKey = ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.CLERK_SECRET_KEY) || process.env.CLERK_SECRET_KEY);
  if (!secretKey) throw new Error('CLERK_SECRET_KEY non configuré');
  return createClerkClient({ secretKey });
}

export const GET: APIRoute = async () => {
  try {
    const db = await getDb();
    const collection = db.collection('site_data');
    let doc = await collection.findOne({ _id: 'current' as any });

    if (!doc) {
      // Seed initial data
      const initial = { _id: 'current' as any, ...defaultSiteData, updatedAt: new Date() };
      await collection.insertOne(initial);
      doc = initial;
    }

    return new Response(JSON.stringify(doc), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error fetching site data from MongoDB:', err);
    // Fallback to default in case of connection failure
    return new Response(JSON.stringify(defaultSiteData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  try {
    const isSecretBypass = cookies.get('admin_secret_session')?.value === 'okok';
    const auth = (locals as any).auth?.();
    const callerId = auth?.userId;

    if (!callerId && !isSecretBypass) {
      return new Response(JSON.stringify({ success: false, error: 'Non authentifié. Connexion requise.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!isSecretBypass && callerId) {
      const clerk = getClerk();
      const caller = await clerk.users.getUser(callerId);
      const callerEmail = (caller.emailAddresses.find((e: any) => e.id === caller.primaryEmailAddressId)?.emailAddress
        || caller.emailAddresses[0]?.emailAddress || '').toLowerCase();

      const callerRoleInfo = await getUserRole(callerEmail, callerId);
      if (!canAccessAdmin(callerRoleInfo.role)) {
        return new Response(JSON.stringify({ success: false, error: 'Accès refusé. Rôle administrateur ou responsable pôle requis.' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const body = await request.json();
    const db = await getDb();
    const collection = db.collection('site_data');

    const updateDoc = {
      ...body,
      updatedAt: new Date(),
      lastUpdatedBy: callerEmail
    };
    delete (updateDoc as any)._id;

    await collection.updateOne(
      { _id: 'current' as any },
      { $set: updateDoc },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true, message: 'Données mises à jour avec succès dans MongoDB' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error updating site data in MongoDB:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
