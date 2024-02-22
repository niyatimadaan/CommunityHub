import jwt from "jsonwebtoken";

export async function createJwtToken(userId) {
  const payload = { userId: userId };
  const options = { expiresIn: "10h" }; // Set the expiration time as needed

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token };
  } catch (error) {
    return { error: true };
  }
}
