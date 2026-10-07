import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';
import { createClerkClient } from '@clerk/astro/server';
import { getUserRole } from '../../../utils/roles';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const {
      brand,
      model,
      issue,
      deviceType = 'smartphone',
      withYango = false, // legacy or flag
      withPickup = false,
      withReturn = false,
      clientLat,
      clientLng,
      distanceKm = 0,
      yangoTierId,
      yangoTierName,
      yangoFee = 0,
      pickupAddress,
      customerName,
      customerPhone,
      estimatedPrice = 0
    } = body;

    if (!brand || !model || !customerPhone) {
      return new Response(JSON.stringify({ error: 'Marque, modèle et numéro de téléphone requis' }), { status: 400 });
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

    const db = await getDb();
    const prefix = isVip ? 'REP-VIP' : 'REP';
    const orderRef = `${prefix}-${Date.now().toString(36).toUpperCase()}`;

    const totalYangoFee = (withPickup ? yangoFee : 0) + (withReturn ? yangoFee : 0);

    const doc = {
      orderRef,
      brand,
      model,
      issue,
      deviceType,
      withYango: withPickup || withReturn || withYango,
      withPickup,
      withReturn,
      clientLat,
      clientLng,
      distanceKm,
      yangoTierId,
      yangoTierName,
      yangoFee: totalYangoFee,
      pickupAddress,
      customerName,
      customerPhone,
      estimatedPrice,
      totalToPay: estimatedPrice + totalYangoFee,
      isVip,
      userRole,
      userEmail,
      userId: callerId || null,
      priority: isVip ? 'urgent-vip' : 'standard',
      status: 'pending',
      createdAt: new Date()
    };

    const res = await db.collection('repair_requests').insertOne(doc);

    return new Response(JSON.stringify({
      success: true,
      orderRef,
      id: res.insertedId,
      totalToPay: doc.totalToPay,
      message: withYango
        ? 'Demande de réparation enregistrée. Un coursier Yango sera assigné pour la collecte.'
        : 'Diagnostic enregistré. Vous pouvez déposer votre appareil au comptoir Super U.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error saving repair request:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
