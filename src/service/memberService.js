import { PrismaClient } from "@prisma/client";
import { Snowflake } from "@theinternetfolks/snowflake";
import responseObject from "../utils/responseObject.js";

const prisma = new PrismaClient();
export async function addMember(req, res) {
  const adminId = req.userId;
  try {
    const { communityId, userId, roleId } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      return res.status(405).json({ error: "User not found" });
    }
    const communityExists = await prisma.community.findUnique({
      where: { id: communityId },
    });
    if (!communityExists) {
      return res.status(405).json({ error: "Community not found" });
    }
    const roleExists = await prisma.role.findUnique({
      where: { id: roleId },
    });
    if (!roleExists) {
      return res.status(405).json({ error: "Role not found" });
    }
    const memberAlready = await prisma.member.findFirst({
      where: { userId, communityId },
    });
    if(memberAlready){
      return res.status(405).json({ error: "Already a member" });
    }

    const auth = await prisma.member.findFirst({
      where: { userId:adminId, communityId },
      select: { role:{ select:{ name: true }} },
    });
    if (auth.role.name != "Community Admin") {
      return res.status(405).json({ error: "NOT_ALLOWED_ACCESS" });
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
    const result = responseObject(member);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteMember(req, res) {
  try {
    const adminId = req.userId;
    const { id } = req.params;

    const mem = await prisma.member.findUnique({
      where: {id},
      select:{communityId:true,}
    });
    if(!mem){
      return res.status(405).json({ error: "Record not found" });
    }

    const comId = mem.communityId;
    const auth = await prisma.member.findFirst({
      where: { userId:adminId, communityId: comId },
      select: { role:{ select:{ name: true }} },
    });
    if (auth.role.name != "Community Admin" && auth.role.name != "Community Moderator") {
      return res.status(405).json({ error: "NOT_ALLOWED_ACCESS" });
    }

    // const { id } = req.params;
    // Delete the member from the community
    const member = await prisma.member.delete({
      where: { id },
    });
    const result = {
      status: true
    }
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
