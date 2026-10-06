import type { APIRoute } from 'astro';
import { uploadImageBuffer, uploadImageUrl } from '../../../lib/cloudinary';
import { getDb } from '../../../lib/mongodb';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let secureUrl = '';
    let publicId = '';
    let customerName = '';
    let customerPhone = '';
    let serviceType = 'tirage_photo';
    let instructions = '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      if (!body.imageUrl) {
        return new Response(JSON.stringify({ error: 'URL d\'image requise' }), { status: 400 });
      }
      const uploaded = await uploadImageUrl(body.imageUrl, 'bcps_studio_photos');
      secureUrl = uploaded.secure_url;
      publicId = uploaded.public_id;
      customerName = body.customerName || '';
      customerPhone = body.customerPhone || '';
      serviceType = body.serviceType || 'tirage_photo';
      instructions = body.instructions || '';
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      customerName = (formData.get('customerName') as string) || '';
      customerPhone = (formData.get('customerPhone') as string) || '';
      serviceType = (formData.get('serviceType') as string) || 'tirage_photo';
      instructions = (formData.get('instructions') as string) || '';

      if (!file) {
        return new Response(JSON.stringify({ error: 'Fichier image manquant' }), { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploaded = await uploadImageBuffer(buffer, 'bcps_studio_photos');
      secureUrl = uploaded.secure_url;
      publicId = uploaded.public_id;
    } else {
      return new Response(JSON.stringify({ error: 'Type de contenu non supporté' }), { status: 400 });
    }

    // Persist to MongoDB
    const db = await getDb();
    const doc = {
      secureUrl,
      publicId,
      customerName,
      customerPhone,
      serviceType,
      instructions,
      status: 'pending',
      createdAt: new Date()
    };
    const insertResult = await db.collection('photo_uploads').insertOne(doc);

    return new Response(JSON.stringify({
      success: true,
      id: insertResult.insertedId,
      secureUrl,
      message: 'Photo transférée avec succès vers le Studio Photo Super U'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error during photo upload:', err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Échec du transfert de la photo'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
