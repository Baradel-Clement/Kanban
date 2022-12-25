import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export const getTaskById = async (id: string, includeColumn: boolean) => {
  const task = await prisma.task.findMany({
    where: {
      id,
    },
    include: {
      column: includeColumn,
    }
  });
  return task;
}

export const addTask = async (reqBody: any) => {
  const newTask = await prisma.task.create({
    data: {
      title: reqBody.title,
      description: reqBody.description,
      status: reqBody.status,
      subtasks: reqBody.subtasks,
      column: { connect: { id: reqBody.columnId } },
    }
  });
  const task = await getTaskById(newTask.id, false);
  return task;
}

export const editTask = async (reqBody: any) => {
  const newTask = await prisma.task.update({
    where: {
      id: reqBody.id,
    },
    data: {
      title: reqBody.title,
      description: reqBody.description,
      status: reqBody.status,
      subtasks: reqBody.subtasks,
      column: { connect: { id: reqBody.columnId } },
    }
  });
  const task = await getTaskById(newTask.id, false);
  return task;
}

export const deleteTask = async (taskId: string) => {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  return deletedTask;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const newTask = await addTask(req.body);
        return res.json(newTask);
      case 'PUT':
        const newTaskEdited = await editTask(req.body);
        return res.json(newTaskEdited);
      case 'DELETE':
        const deletedTask = await deleteTask(req.body.taskId);
        return res.json(deletedTask);
      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}