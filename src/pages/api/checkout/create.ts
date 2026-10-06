import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';
import { createPayDunyaInvoice } from '../../../lib/paydunya';

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const body = await request.json();
    const {
      category = 'boutique',
      title = 'Commande Prestige Services',
      amount = 0,
      items = [],
      customerName = '',
      customerPhone = '',
      customerEmail = '',
      deliveryAddress = '',
      pickupType = 'comptoir',
      metadata = {}
    } = body;

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Montant invalide' }), { status: 400 });
    }
    if (!customerPhone) {
      return new Response(JSON.stringify({ error: 'Numéro de téléphone requis' }), { status: 400 });
    }

    const orderId = `BCPS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    // Store in MongoDB
    const db = await getDb();
    const orderDoc = {
      orderId,
      category,
      title,
      amount: Number(amount),
      items,
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      pickupType,
      metadata,
      status: 'pending_payment',
      paymentProvider: 'paydunya',
      createdAt: new Date(),
      paidAt: null
    };

    await db.collection('orders').insertOne(orderDoc);

    const siteOrigin = url.origin;
    process.env.PUBLIC_SITE_URL = siteOrigin;

    const invoice = await createPayDunyaInvoice({
      orderId,
      title,
      amount: Number(amount),
      customerName,
      customerPhone,
      customerEmail,
      items,
      returnUrl: `${siteOrigin}/commande/succes?order_id=${orderId}`,
      cancelUrl: `${siteOrigin}/commande/annulee?order_id=${orderId}`
    });

    // Update order with payment token
    await db.collection('orders').updateOne(
      { orderId },
      { $set: { paymentToken: invoice.token, isSimulated: invoice.isSimulated } }
    );

    return new Response(JSON.stringify({
      success: true,
      orderId,
      paymentUrl: invoice.paymentUrl,
      token: invoice.token,
      isSimulated: invoice.isSimulated,
      message: invoice.message || 'Tunnel de paiement initialisé'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error in checkout/create:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
