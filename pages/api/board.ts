import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { editColumnViaBoard } from "./column";

export const getBoardById = async (id: string, includeUser: boolean) => {
  const board = await prisma.board.findMany({
    where: {
      id,
    },
    include: {
      user: includeUser,
      columns: true,
    },
  });
  return board;
}

export const getBoards = async (userId: string) => {
  const boards = await prisma.board.findMany({
    where: {
      userId,
    },
    include: {
      columns: true,
    }
  });
  return boards;
}

export const createBoard = async (reqBody: any, session: any) => {
  const newBoard = await prisma.board.create({
    data: {
      name: reqBody.name,
      columns: {
        create: reqBody.columns.map((column: any) => ({
          name: column.name,
        })),
      },
      user: { connect: { email: session?.user?.email } }, // Connect the new invoice to an existing User with the email provided
    },
  });
  const board = await getBoardById(newBoard.id, false);
  return board;
}

export const editBoard = async (reqBody: any, session: any) => {
  const updateBoard = await prisma.board.update({
    where: {
      id: reqBody.id,
    },
    data: {
      name: reqBody.name,
      user: { connect: { email: session?.user?.email } },
    }
  });
  const board = await getBoardById(reqBody.id, true);
  return board;
}

export const deleteBoard = async (boardId: string) => {
  const deleteBoard = await prisma.board.delete({
    where: {
      id: boardId,
    },
  });
  return deleteBoard;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  try {
    switch (req.method) {
      case 'POST':
        const newBoard = await createBoard(req.body, session);
        return res.json(newBoard);
      case 'PUT':
        const updateBoard = await editBoard(req.body, session);
        const updateColumns = await editColumnViaBoard(req.body, session);
        return res.json({updateBoard, updateColumns});
      case 'DELETE':
        const deletedBoard = await deleteBoard(req.body.boardId);
        return res.json(deletedBoard);
      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}