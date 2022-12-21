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
  id: string
  title: string
  description: string
  status: string
  columnId: string
  subtasks?: Subtask[]
}

export type IColumn = {
  id: string
  name: string
  tasks?: Task[]
  boardId: string | null
}

export type IBoard = {
  id: string
  name: string
  columns: IColumn[]
  userId?: string
}

export type HomeContextType = {
  updateBoardModal: boolean;
  boards: IBoard[];
  boardSelectedId: string;
  showSidebar: boolean;
  darkMode: boolean;
  setUpdateBoardModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
  setBoardSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
};

export type BoardContextType = {
  displayAddEditBoard: { display: boolean, mode: string }
  addBoardInputs: {
    name: string;
    columns: {
      id: string;
      name: string;
    }[];
  }
  editBoardInputs: {
    name: string;
    columns: {
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
    columns: {
      id: string;
      name: string;
    }[];
  }>>
  setEditBoardInputs: React.Dispatch<React.SetStateAction<{
    name: string;
    columns: {
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

export type TaskContextType = {
  displayAddTask: boolean;
  displayAddTaskSelectColumn: boolean;
  addTaskInputs: { title: string, description: string, subtasks: { id: string, name: string }[], status: { value: string, columnId: string } };
  addTaskErrors: { title: boolean, description: boolean, subtasks: string[] }
  setDisplayAddTask: React.Dispatch<React.SetStateAction<boolean>>
  setDisplayAddTaskSelectColumn: React.Dispatch<React.SetStateAction<boolean>>
  setAddTaskInputs: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    subtasks: {
      id: string;
      name: string;
    }[];
    status: { value: string, columnId: string };
  }>>
  setAddTaskErrors: React.Dispatch<React.SetStateAction<{ title: boolean, description: boolean, subtasks: string[] }>>
  onChangeAddTaskInputs: (inputName: string, mode: string, subtaskId: string, inputValue: string) => void
  checkAddTaskFormErrors: () => boolean
};