import { PrismaClient } from "@prisma/client";
import { Snowflake } from "@theinternetfolks/snowflake";

const prisma = new PrismaClient();
export async function addMember(req, res) {
  try {
    const { communityId, userId, roleId } = req.body;

    // Find the user by email
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    // Find the community by ID
    const communityExists = await prisma.community.findUnique({
      where: { id: communityId },
      select: { id: true }
    });
    if (!communityExists) {
      return res.status(404).json({ error: "Community not found" });
    }
    // Add the user as a member to the community
    const member = await prisma.member.create({
      data: {
        id: Snowflake.generate(),
        communityId: communityId,
        userId: userId,
        roleId: roleId, // Replace with the actual ID of the Community Member role
      },
    });

    res.json(member);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteMember(req, res) {
  try {
    //validate userId as communityHead
    
    const { id } = req.params;
    // Delete the member from the community
    const member = await prisma.member.delete({
      where: { id },
    });

    res.json(member);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
