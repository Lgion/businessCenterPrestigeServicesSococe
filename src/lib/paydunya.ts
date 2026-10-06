/**
 * PayDunya Checkout Integration for Business Center Prestige Services
 * Documentation: https://paydunya.com
 */

export interface PayDunyaItem {
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  description?: string;
}

export interface CreateInvoiceParams {
  orderId: string;
  title: string;
  amount: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items?: PayDunyaItem[];
  returnUrl?: string;
  cancelUrl?: string;
}

export interface InvoiceResult {
  success: boolean;
  paymentUrl: string;
  token: string;
  isSimulated?: boolean;
  message?: string;
}

export async function createPayDunyaInvoice(params: CreateInvoiceParams): Promise<InvoiceResult> {
  const masterKey = process.env.PAYDUNYA_MASTER_KEY;
  const privateKey = process.env.PAYDUNYA_PRIVATE_KEY;
  const token = process.env.PAYDUNYA_TOKEN;
  const mode = process.env.PAYDUNYA_MODE || 'test';
  const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';

  // If live or sandbox keys are provided, call PayDunya REST API
  if (masterKey && privateKey && token) {
    const apiUrl = mode === 'live'
      ? 'https://app.paydunya.com/api/v1/checkout-invoice/create'
      : 'https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create';

    const invoiceItems = (params.items && params.items.length > 0)
      ? params.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price || item.unit_price * item.quantity,
          description: item.description || ''
        }))
      : [{
          name: params.title,
          quantity: 1,
          unit_price: params.amount,
          total_price: params.amount,
          description: `Commande #${params.orderId}`
        }];

    const payload = {
      invoice: {
        total_amount: params.amount,
        description: `${params.title} - Réf: ${params.orderId}`,
        items: invoiceItems
      },
      store: {
        name: "BUSINESS CENTER PRESTIGE SERVICES",
        tagline: "Super U Deux Plateaux (Gare de Sococé), Abidjan",
        phone: "+225 07 89 08 30 85",
        postal_address: "Galerie Super U Deux Plateaux, Cocody, Abidjan",
        logo_url: `${siteUrl}/images/hero-store.jpg`
      },
      custom_data: {
        order_id: params.orderId,
        customer_phone: params.customerPhone || '',
        customer_email: params.customerEmail || ''
      },
      actions: {
        cancel_url: params.cancelUrl || `${siteUrl}/commande/annulee?order_id=${params.orderId}`,
        return_url: params.returnUrl || `${siteUrl}/commande/succes?order_id=${params.orderId}`,
        callback_url: `${siteUrl}/api/checkout/webhook`
      }
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PAYDUNYA-MASTER-KEY': masterKey,
          'PAYDUNYA-PRIVATE-KEY': privateKey,
          'PAYDUNYA-TOKEN': token
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.response_code === '00') {
        return {
          success: true,
          paymentUrl: data.response_text,
          token: data.token,
          isSimulated: false
        };
      }
      console.warn('PayDunya API response:', data);
    } catch (e: any) {
      console.error('PayDunya API network error:', e.message);
    }
  }

  // Fallback Simulator (test mode ready without mandatory external merchant account)
  const simulatedToken = `SIM-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const simulatedUrl = `${siteUrl}/checkout/simulate?order_id=${encodeURIComponent(params.orderId)}&token=${simulatedToken}&amount=${params.amount}&title=${encodeURIComponent(params.title)}`;

  return {
    success: true,
    paymentUrl: simulatedUrl,
    token: simulatedToken,
    isSimulated: true,
    message: "Mode simulation actif (ajoutez les clés PayDunya dans .env pour passer en live/sandbox)"
  };
}
