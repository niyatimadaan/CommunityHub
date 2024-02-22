// import { prisma } from '../db';
import { hash, compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import pkg from '@theinternetfolks/snowflake';

const prisma = new PrismaClient();
const { generateSnowflakeId }= pkg;
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
  console.log(email);
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
}

export async function getMe(req,res) {
    const userId = req.user.id; // Assuming you have user authentication middleware
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      // Exclude the password from the response
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        // Add any other fields you want to include
      },
    });
    return res.json(user);
  }