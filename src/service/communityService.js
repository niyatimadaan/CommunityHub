import { PrismaClient } from "@prisma/client";
import { Snowflake } from "@theinternetfolks/snowflake";
// import { responseObject } from "../utils/responseObject.js";

const prisma = new PrismaClient();
const itemsPerPage = 10;

const responseObject = (data, totalCount) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const result = {
    status: true,
    content: {
      meta: {
        total: totalCount,
        pages: totalPages,
        page: 1,
      },
      data: data,
    },
  };
  return result;
};

export async function createCommunity(req, res) {
  const { name } = req.body;
  const userId = req.userId;
  if (name.length <= 2) {
    return res
      .status(400)
      .json({ error: "Name must be longer than 2 characters" });
  }

  let slug;
  const slugExists = await prisma.community.findUnique({
    where: { slug: name },
  });
  if (slugExists) {
    slug = name + Snowflake.generate();
  } else {
    slug = name;
  }

  const community = await prisma.community.create({
    data: {
      id: Snowflake.generate(),
      name,
      slug,
      ownerId: userId,
    },
  });

  const adminRoleId = await prisma.role.findUnique({
    where: {
      name: "Community Admin",
    },
    select: {
      id: true,
    },
  });
  await prisma.member.create({
    data: {
      id: Snowflake.generate(),
      communityId: community.id,
      userId: userId,
      roleId: adminRoleId.id,
    },
  });

  // return responseObject(community);
  const responseObject = {
    status: true,
    content: {
      data: community,
    },
  };
  return res.json(responseObject);
}

export async function getAllCommunities(req, res) {
  const totalCount = await prisma.community.count();

  const communities = await prisma.community.findMany({
    take: itemsPerPage,
    skip: 0,
    include: {
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  res.json(responseObject(communities, totalCount));
}

export async function getAllMembers(req, res) {
  const { id } = req.params;
  const communityId = await prisma.community.findUnique({
    where: { slug: id },
    select: { id: true },
  });
  if (!communityId) {
    return res.status(404).json({ error: "Community not found" });
  }

  const totalCount = await prisma.member.count({
    where: { communityId: communityId.id },
  });

  const community = await prisma.member.findMany({
    where: { communityId: communityId.id },
    take: itemsPerPage,
    skip: 0,
    select: {
      id: true,
      communityId:true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      role: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt:true
    },
  });
  res.json(responseObject(community, totalCount));
}

export async function getMyOwnedCommunities(req, res) {
  const userId = req.userId; 

  const totalCount = await prisma.community.count({
    where: { ownerId: userId },
  });
  const communities = await prisma.community.findMany({
    where: { ownerId: userId },
    take: itemsPerPage,
    skip: 0,
  });

  res.json(responseObject(communities,totalCount));
}

export async function getMyJoinedCommunities(req, res) {
  const userId = req.userId; // Assuming you have user authentication middleware

  const totalCount = await prisma.member.count({
    where: { userId },
  });

  const memberships = await prisma.member.findMany({
    where: { userId },
    take: itemsPerPage,
    skip: 0,
    include: {
      community: {
        include: {
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  const communities = memberships.map((membership) => membership.community);
  res.json(responseObject(communities,totalCount));
}
