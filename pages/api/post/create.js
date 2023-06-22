import { connectDB } from '@/util/database';

export default async function Create(req, res) {
  if (req.method === 'POST') {
    const db = (await connectDB).db('memory');
    let result = db.collection('nft').insertOne(req.body);
    res.status(200).redirect(302, '/');
  }
}
