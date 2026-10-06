import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { itemName, customerPhone, customerName = '', notes = '' } = body;

    if (!customerPhone) {
      return new Response(JSON.stringify({ error: 'Numéro de téléphone requis' }), { status: 400 });
    }

    const db = await getDb();
    const doc = {
      itemName,
      customerPhone,
      customerName,
      notes,
      status: 'pending',
      createdAt: new Date()
    };

    const res = await db.collection('gaming_callbacks').insertOne(doc);

    return new Response(JSON.stringify({
      success: true,
      id: res.insertedId,
      message: 'Demande de rappel enregistrée. Notre conseiller Gaming vous contactera dans les plus brefs délais.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error saving callback request:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
