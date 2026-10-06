import type { APIRoute } from 'astro';
import { getDb } from '../../lib/mongodb';
import { defaultSiteData } from '../../data/siteData';

export const GET: APIRoute = async () => {
  try {
    const db = await getDb();
    const collection = db.collection('site_data');
    let doc = await collection.findOne({ _id: 'current' as any });

    if (!doc) {
      // Seed initial data
      const initial = { _id: 'current' as any, ...defaultSiteData, updatedAt: new Date() };
      await collection.insertOne(initial);
      doc = initial;
    }

    return new Response(JSON.stringify(doc), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error fetching site data from MongoDB:', err);
    // Fallback to default in case of connection failure
    return new Response(JSON.stringify(defaultSiteData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const db = await getDb();
    const collection = db.collection('site_data');

    const updateDoc = {
      ...body,
      updatedAt: new Date()
    };
    delete (updateDoc as any)._id;

    await collection.updateOne(
      { _id: 'current' as any },
      { $set: updateDoc },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true, message: 'Données mises à jour avec succès dans MongoDB' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error updating site data in MongoDB:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
