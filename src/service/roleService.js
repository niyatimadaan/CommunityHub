import { PrismaClient } from "@prisma/client";
import { Snowflake } from "@theinternetfolks/snowflake";
import responseObject from "../utils/responseObject.js";

const prisma = new PrismaClient();

export async function createRole(req, res) {
  const { name } = req.body;

  try {
    const newRole = await prisma.role.create({
      data: {
        id: Snowflake.generate(),
        name,
      },
    });
    res.status(201).json(responseObject(newRole));
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the role. " + error });
  }
}

export async function getAllRole(req, res) {
  const itemsPerPage = 10;
  try {
    const totalCount = await prisma.role.count();
    const roles = await prisma.role.findMany({
      take: itemsPerPage,
      skip: 0,
    });
    
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const result = {
      status: true,
      content: {
        meta: {
          total: totalCount,
          pages: totalPages,
          page: 1,
        },
        data: roles,
      },
    };
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching roles." });
  }
}
