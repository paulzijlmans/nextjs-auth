import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
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

  const db = connectToDatabase();
  await db.collection('users').insertOne({
    email,
    password: hashPassword(password),
  });

  res.status(201).json({ message: 'User created!' });
}
