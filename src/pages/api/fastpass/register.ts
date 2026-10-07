import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';
import { createClerkClient } from '@clerk/astro/server';
import { getUserRole } from '../../../utils/roles';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const {
      operationType = 'depot',
      operator = 'wave',
      amount = 0,
      recipientPhone = '',
      customerPhone = '',
      customerName = '',
      notes = ''
    } = body;

    if (!customerPhone || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Montant et numéro de téléphone requis' }), { status: 400 });
    }

    const auth = (locals as any)?.auth?.();
    const callerId = auth?.userId;
    let isVip = false;
    let userRole = 'anonymous';
    let userEmail = '';

    if (callerId) {
      try {
        const clerk = createClerkClient({ secretKey: ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.CLERK_SECRET_KEY) || process.env.CLERK_SECRET_KEY) });
        const user = await clerk.users.getUser(callerId);
        userEmail = (user.emailAddresses.find((e: any) => e.id === user.primaryEmailAddressId)?.emailAddress 
          || user.emailAddresses[0]?.emailAddress || '').toLowerCase();
        const roleInfo = await getUserRole(userEmail, callerId);
        userRole = roleInfo.role;
        isVip = roleInfo.role === 'vip' || roleInfo.role === 'admin';
      } catch (e) {}
    }

    const prefix = isVip ? 'VIP' : 'FP';
    const fastpassCode = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    const db = await getDb();

    const doc = {
      fastpassCode,
      operationType,
      operator,
      amount,
      recipientPhone,
      customerPhone,
      customerName,
      notes,
      isVip,
      userRole,
      userEmail,
      userId: callerId || null,
      priority: isVip ? 'urgent-vip' : 'standard',
      status: 'active',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h validity
    };

    const res = await db.collection('mobile_money_fastpass').insertOne(doc);

    return new Response(JSON.stringify({
      success: true,
      fastpassCode,
      isVip,
      id: res.insertedId,
      message: isVip 
        ? `⭐ Coupe-File VIP PRIORITAIRE généré (Code: ${fastpassCode}). Guichet Super U prévenu pour un traitement immédiat.`
        : `Votre coupe-file a été généré avec succès (Code: ${fastpassCode}). Présentez-le au guichet Super U.`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error generating fastpass:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
