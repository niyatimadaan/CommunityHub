export async function createCommunity(req, res) {
  const { name } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware

  const community = await prisma.community.create({
    data: {
      id: generateSnowflakeId(),
      name,
      ownerId: userId,
    },
  });
  res.status(201).json(community);
}

export async function getAllCommunities(req, res) {
  const communities = await prisma.community.findMany();
  res.json(communities);
}

export async function getAllMembers(req, res) {
  const { id } = req.params;
  const community = await prisma.community.findUnique({
    where: { id },
    include: { members: true }, // Include members in the response
  });
  if (!community) {
    return res.status(404).json({ error: "Community not found" });
  }

  res.json(community.members);
}

export async function getMyOwnedCommunities(req, res) {
    const userId = req.user.id; // Assuming you have user authentication middleware

    const communities = await prisma.community.findMany({
      where: { ownerId: userId },
    });
  
    res.json(communities);
}

export async function getMyJoinedCommunities(req, res) {
    const userId = req.user.id; // Assuming you have user authentication middleware

  const memberships = await prisma.member.findMany({
    where: { userId },
    include: { community: true }, // Include community in the response
  });
  const communities = memberships.map(membership => membership.community);
  res.json(communities);
}
