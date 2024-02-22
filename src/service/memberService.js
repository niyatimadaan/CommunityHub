import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function addMember(req, res) {
  try {
    const { email, communityId } = req.body;
    // Validate the input here

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Find the community by ID
    const community = await prisma.community.findUnique({
      where: { id: communityId },
    });
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    // Add the user as a member to the community
    const member = await prisma.member.create({
      data: {
        communityId: community.id,
        userId: user.id,
        roleId: "member_role_id", // Replace with the actual ID of the Community Member role
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
