import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';

export const POST: APIRoute = async ({ request }) => {
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

    const fastpassCode = `FP-${Math.floor(1000 + Math.random() * 9000)}`;
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
      status: 'active',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h validity
    };

    const res = await db.collection('mobile_money_fastpass').insertOne(doc);

    return new Response(JSON.stringify({
      success: true,
      fastpassCode,
      id: res.insertedId,
      message: `Votre coupe-file VIP a été généré avec succès (Code: ${fastpassCode}). Présentez-le directement au guichet Super U sans attente.`
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
