import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const token = data?.data?.invoice?.token || data?.token;
    const status = data?.data?.status || data?.status;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token manquant' }), { status: 400 });
    }

    const db = await getDb();
    if (status === 'completed' || status === 'success') {
      await db.collection('orders').updateOne(
        { paymentToken: token },
        {
          $set: {
            status: 'paid',
            paidAt: new Date(),
            webhookPayload: data
          }
        }
      );
    }

    return new Response(JSON.stringify({ success: true, message: 'Webhook traité' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error handling PayDunya webhook:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
