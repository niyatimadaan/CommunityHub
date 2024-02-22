// import { prisma } from '../db';
import { hash, compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Snowflake } from '@theinternetfolks/snowflake';
import { createJwtToken } from '../utils/createJwtToken.js';

const prisma = new PrismaClient();

export async function signup(req, res) {

  const { name, email, password } = req.body;

  const hashedPassword = await hash(password,  10);
  const userId = Snowflake.generate();

  const token = createJwtToken(userId);

  const user = await prisma.user.create({
    data: {
      id: userId,
      name,
      email,
      password: hashedPassword,
    },
  });

  const responseObject = {
    status: true,
    content: {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      meta: {
        access_token: token,
      },
    },
  };
  res.json(responseObject);
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
    const userId = req.userId; // Assuming you have user authentication middleware
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });
    return res.json(user);
  }