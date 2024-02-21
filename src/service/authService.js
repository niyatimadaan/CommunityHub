import { prisma } from '../db';
import { hash, compare } from 'bcrypt';
import { generateSnowflakeId } from '@theinternetfolks/snowflake';

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await hash(password,  10);
  const userId = generateSnowflakeId();

  const user = await prisma.user.create({
    data: {
      id: userId,
      name,
      email,
      password: hashedPassword,
    },
  });

  res.json(user);
}

export async function signin(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
}
