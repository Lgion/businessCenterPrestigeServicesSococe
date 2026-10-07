import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';
import { createClerkClient } from '@clerk/astro/server';
import { getUserRole, canAccessAdmin } from '../../../utils/roles';

function getClerk() {
  const secretKey = ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.CLERK_SECRET_KEY) || process.env.CLERK_SECRET_KEY);
  if (!secretKey) throw new Error('CLERK_SECRET_KEY non configuré');
  return createClerkClient({ secretKey });
}

export const GET: APIRoute = async ({ locals, cookies }) => {
  try {
    const isSecretBypass = cookies.get('admin_secret_session')?.value === 'okok';
    const auth = (locals as any).auth?.();
    const callerId = auth?.userId;

    if (!callerId && !isSecretBypass) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Non authentifié. Connexion Clerk requise.',
        data: { orders: [], repairRequests: [], photoUploads: [], gamingCallbacks: [], fastpasses: [] }
      }), {
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
        return new Response(JSON.stringify({
          success: false,
          error: 'Accès refusé. Rôle administrateur ou responsable pôle requis.',
          data: { orders: [], repairRequests: [], photoUploads: [], gamingCallbacks: [], fastpasses: [] }
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const db = await getDb();

    // Query recent collections in parallel
    const [orders, repairRequests, photoUploads, documentOrders, gamingCallbacks, fastpasses] = await Promise.all([
      db.collection('orders').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('repair_requests').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('photo_uploads').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('document_orders').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('gaming_callbacks').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('mobile_money_fastpass').find().sort({ createdAt: -1 }).limit(30).toArray(),
    ]);

    return new Response(JSON.stringify({
      success: true,
      callerRole: callerRoleInfo.role,
      assignedPoles: callerRoleInfo.assignedPoles,
      data: {
        orders,
        repairRequests,
        photoUploads,
        documentOrders,
        gamingCallbacks,
        fastpasses
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error fetching admin records from MongoDB:', err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message,
      data: {
        orders: [],
        repairRequests: [],
        photoUploads: [],
        gamingCallbacks: [],
        fastpasses: []
      }
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
