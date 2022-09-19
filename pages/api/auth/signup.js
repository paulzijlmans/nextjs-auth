import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const db = await connectToDatabase();
    await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created!' });
  }
}
