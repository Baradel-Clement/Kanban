import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export const getColumnById = async (id: string) => {
  const board = await prisma.column.findFirst({
    where: {
      id,
    },
    include: {
      tasks: true,
    },
  });
  return board;
}

export const addColumnViaBoard = async (boardId: string) => {
  const newColumn = await prisma.column.create({
    data: {
      name: '',
      Board: { connect: { id: boardId } },
    }
  });
  return newColumn;
}

export const editColumn = async (reqBody: { id: string, name: string }) => {
  const updateColumn = await prisma.column.update({
    where: {
      id: reqBody.id,
    },
    data: {
      name: reqBody.name,
    },
    include: {
      tasks: true,
    }
  });
  return updateColumn;
}

export const editColumnViaBoard = async (reqBody: any, session: any) => {
  const updatedColumns = await Promise.all(
    reqBody.columns.map((column: { id: string, name: string }) => editColumn({ id: column.id, name: column.name }))
  );
  return updatedColumns;
}

export const deleteColumn = async (columnId: string) => {
  const deletedColumn = await prisma.column.delete({
    where: {
      id: columnId,
    }
  })
  return deletedColumn;
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const newColumn = await addColumnViaBoard(req.body.boardId);
        return res.json(newColumn);
      case 'DELETE':
        const columnToDelete = await getColumnById(req.body.columnId);
        if (columnToDelete?.tasks[0]) {
          return res.status(500).send({ error: 'TASKS ERROR'})
        }
        else {
          const deletedColumn = await deleteColumn(req.body.columnId);
          return res.json(deletedColumn);
        }
      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}