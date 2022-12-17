// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: string
  name: string
}

export type Subtask = {
  title: string
  isCompleted: boolean
}

export type Task = {
  title: string
  description: string
  status: string
  columnId: string
  subtasks?: Subtask[]
}

export type Column = {
  id: string
  name: string
  tasks?: Task[]
  boardId: string | null
}

export type Board = {
  id: string
  name: string
  columns: Column[]
  userId?: string
}

export type HomeContextType = {
  updateBoardModal: boolean;
  boards: Board[];
  boardSelectedId: string;
  setUpdateBoardModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  setBoardSelectedId: React.Dispatch<React.SetStateAction<string>>;
};

export type BoardContextType = {
  displayAddEditBoard: { display: boolean, mode: string }
  addBoardInputs: {
    name: string;
    columns: [] | {
      id: string;
      name: string;
    }[];
  }
  editBoardInputs: {
    name: string;
    columns: [] | {
      id: string;
      name: string;
    }[];
  }
  displayDeleteModal: { display: boolean, mode: string, id: string };
  setDisplayAddEditBoard: React.Dispatch<React.SetStateAction<{
    display: boolean;
    mode: string;
  }>>
  setAddBoardInputs: React.Dispatch<React.SetStateAction<{
    name: string;
    columns: [] | {
      id: string;
      name: string;
    }[];
  }>>
  setEditBoardInputs: React.Dispatch<React.SetStateAction<{
    name: string;
    columns: [] | {
      id: string;
      name: string;
    }[];
  }>>
  setDisplayDeleteModal: React.Dispatch<React.SetStateAction<{
    display: boolean;
    mode: string;
    id: string;
  }>>
  onChangeAddBoards: (columnId: string, columnName: string, deleting: string) => void;
  onChangeEditBoards: (columnId: string, columnName: string, mode: string) => void;
};