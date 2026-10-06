import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';

export const POST: APIRoute = async ({ request }) => {
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

    const db = await getDb();
    const orderRef = `REP-${Date.now().toString(36).toUpperCase()}`;

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
