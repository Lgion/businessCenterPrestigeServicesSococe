import type { APIRoute } from 'astro';
import { uploadFileBuffer } from '../../../lib/cloudinary';
import { getDb } from '../../../lib/mongodb';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({ error: 'Format multipart/form-data requis' }), { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const customerName = (formData.get('customerName') as string) || '';
    const customerPhone = (formData.get('customerPhone') as string) || '';
    const serviceType = (formData.get('serviceType') as string) || 'impression_standard';
    const instructions = (formData.get('instructions') as string) || '';
    const copies = parseInt((formData.get('copies') as string) || '1', 10);
    const withDelivery = formData.get('withDelivery') === 'true';
    const deliveryAddress = (formData.get('deliveryAddress') as string) || '';
    const yangoFee = parseInt((formData.get('yangoFee') as string) || '0', 10);
    const yangoZone = (formData.get('yangoZone') as string) || '';

    if (!file) {
      return new Response(JSON.stringify({ error: 'Fichier manquant (PDF, Word, etc.)' }), { status: 400 });
    }

    // 1. Upload file buffer to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const uploaded = await uploadFileBuffer(buffer, 'bcps_documents_pao', sanitizedName);

    // 2. Persist in MongoDB
    const db = await getDb();
    const doc = {
      originalFileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      secureUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      customerName,
      customerPhone,
      serviceType,
      instructions,
      copies,
      delivery: {
        withDelivery,
        address: deliveryAddress,
        yangoFee,
        yangoZone
      },
      status: 'pending',
      createdAt: new Date()
    };

    const result = await db.collection('document_orders').insertOne(doc);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: result.insertedId,
        secureUrl: uploaded.secure_url,
        fileName: file.name
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Erreur API Upload Document:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Erreur lors du traitement du document' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
