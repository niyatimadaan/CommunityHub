import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function requireAuth(req, res, next) {
  const prisma = new PrismaClient();
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const userExists = await prisma.user.findUnique({where: { id: userId}});
    if (!userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
