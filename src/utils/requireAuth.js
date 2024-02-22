import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function requireAuth(req, res, next) {
  const prisma = new PrismaClient();
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log(decoded.userId);

    // const user = await user.findById(decoded.userId);
    const userExists = await prisma.user.findUnique({where: { id: userId}});
    if (!userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    console.log(decoded);
    // console.log(user);

    // if (!user) {
    //   return res.status(401).json({ message: "User not found" });
    // }
    req.userId = userId;
    // If the header is present, proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
