import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { orderId, paymentMethod = 'Wave' } = await request.json();
    if (!orderId) {
      return new Response(JSON.stringify({ error: 'Order ID manquant' }), { status: 400 });
    }

    const db = await getDb();
    await db.collection('orders').updateOne(
      { orderId },
      {
        $set: {
          status: 'paid',
          simulatedMethod: paymentMethod,
          paidAt: new Date()
        }
      }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
