import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/mongodb';

export const GET: APIRoute = async () => {
  try {
    const db = await getDb();

    // Query recent collections in parallel
    const [orders, repairRequests, photoUploads, gamingCallbacks, fastpasses] = await Promise.all([
      db.collection('orders').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('repair_requests').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('photo_uploads').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('gaming_callbacks').find().sort({ createdAt: -1 }).limit(30).toArray(),
      db.collection('mobile_money_fastpass').find().sort({ createdAt: -1 }).limit(30).toArray(),
    ]);

    return new Response(JSON.stringify({
      success: true,
      data: {
        orders,
        repairRequests,
        photoUploads,
        gamingCallbacks,
        fastpasses
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error fetching admin records from MongoDB:', err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message,
      data: {
        orders: [],
        repairRequests: [],
        photoUploads: [],
        gamingCallbacks: [],
        fastpasses: []
      }
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
