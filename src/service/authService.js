// import { prisma } from '../db';
import { hash, compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Snowflake } from '@theinternetfolks/snowflake';
import { createJwtToken } from '../utils/createJwtToken.js';

const prisma = new PrismaClient();

export async function signup(req, res) {

  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({where: { email}});
  if (userExists) {
    return atus(400).json({ error: 'Email already exists' });
  }

  const hashedPassword = await hash(password,  10);
  const userId = Snowflake.generate();

  const token = await createJwtToken(userId);
  if(token.error){
    return res.status(400).json({error:"Error generating token"});
  }

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
        access_token: token.token,
      },
    },
  };
  return res.json(responseObject);
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

  const token = await createJwtToken(user.id);
  if(token.error){
    return res.status(400).json({error:"Error generating token"});
  }
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
        access_token: token.token,
      },
    },
  };
  return res.json(responseObject);
}

export async function getMe(req,res) {
    const userId = req.userId; // Assuming you have user authentication middleware
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    const responseObject = {
      status: true,
      content: {
        data: user,
      },
    };
    return res.json(responseObject);
  }