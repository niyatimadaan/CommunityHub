import { verify } from "jsonwebtoken";

export function getUserIdFromToken(token) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded.userId; // Assuming 'userId' is the property in the payload
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
