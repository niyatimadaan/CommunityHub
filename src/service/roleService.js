export async function createRole(req, res) {
  const { name } = req.body;

  try {
    const newRole = await prisma.role.create({
      data: {
        name,
      },
    });
    res.status(201).json(newRole);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the role." });
  }
}

export async function getAllRole(req, res) {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching roles." });
  }
}
