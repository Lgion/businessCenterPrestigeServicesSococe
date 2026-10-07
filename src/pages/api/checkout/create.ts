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

    const auth = (locals as any)?.auth?.();
    const callerId = auth?.userId;
    let isVip = false;
    let userRole = 'anonymous';
    let authUserEmail = '';

    if (callerId) {
      try {
        const { createClerkClient } = await import('@clerk/astro/server');
        const { getUserRole } = await import('../../../utils/roles');
        const clerk = createClerkClient({ secretKey: ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.CLERK_SECRET_KEY) || process.env.CLERK_SECRET_KEY) });
        const user = await clerk.users.getUser(callerId);
        authUserEmail = (user.emailAddresses.find((e: any) => e.id === user.primaryEmailAddressId)?.emailAddress 
          || user.emailAddresses[0]?.emailAddress || '').toLowerCase();
        const roleInfo = await getUserRole(authUserEmail, callerId);
        userRole = roleInfo.role;
        isVip = roleInfo.role === 'vip' || roleInfo.role === 'admin';
      } catch (e) {}
    }

    const orderId = `BCPS-${isVip ? 'VIP-' : ''}${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

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
      customerEmail: customerEmail || authUserEmail,
      deliveryAddress,
      pickupType,
      metadata,
      isVip,
      userRole,
      userId: callerId || null,
      priority: isVip ? 'urgent-vip' : 'standard',
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
