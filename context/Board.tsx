import React, { createContext, useContext, useState } from 'react';
import { BoardContextType } from '../interfaces';

type BoardContextProviderProps = {
  children: React.ReactNode;
}

export const BoardContext = createContext({} as BoardContextType)

export const BoardContextProvider = ({ children }: BoardContextProviderProps) => {
  const [displayAddEditBoard, setDisplayAddEditBoard] = useState({ display: false, mode: '' });
  const [addBoardInputs, setAddBoardInputs] = useState<{ name: string, columns: [] | { id: string, name: string }[] }>({
    name: '',
    columns: [{ name: 'Todo', id: '1' }, { name: 'Doing', id: '2' }, { name: 'Done', id: '3' }]
  })
  const [editBoardInputs, setEditBoardInputs] = useState<{ name: string, columns: [] | { id: string, name: string }[] }>({
    name: '',
    columns: []
  });
  const [displayDeleteModal, setDisplayDeleteModal] = useState({ display: false, mode: '', id: '' })

  const onChangeAddBoards = (columnId: string, columnName: string, mode: string) => {
    if (mode === 'deleting') {
      const newColumns: { id: string, name: string }[] = [];
      addBoardInputs.columns.forEach((column) => {
        if (column.id !== columnId) {
          newColumns.push(column);
        }
      })
      setAddBoardInputs({ ...addBoardInputs, columns: newColumns });
    }
    else if (mode === 'add') {
      let newId = '';
      const newColumns = addBoardInputs.columns.map((column) => {
        newId = 'azdzd';
        return {
          ...column
        }
      });

      newColumns.push({ name: '', id: newId })
      setAddBoardInputs({ ...addBoardInputs, columns: newColumns });
    }
    else {
      const newColumns = addBoardInputs.columns.map((column) => {
        if (column.id === columnId) {
          return {
            name: columnName,
            id: column.id
          }
        }
        return {
          ...column
        }
      })
      setAddBoardInputs({ ...addBoardInputs, columns: newColumns });
    }
  }

  const onChangeEditBoards = (columnId: string, columnName: string, mode: string) => {
    if (mode === 'changeName') {
      const newColumns = editBoardInputs.columns.map((column) => {
        if (column.id === columnId) {
          return {
            name: columnName,
            id: column.id
          }
        }
        return {
          ...column
        }
      })
      setEditBoardInputs({ ...editBoardInputs, columns: newColumns });
    }
    else if (mode === 'add') {
      const newColumns = [];
      editBoardInputs.columns.forEach((col) => newColumns.push(col));
      newColumns.push({ id: columnId, name: '' });
      setEditBoardInputs({ ...editBoardInputs, columns: newColumns });
    }
    else if (mode === 'delete') {
      const indexToRemove = editBoardInputs.columns.findIndex((col) => col.id === columnId);
      const newColumns: {
        id: string;
        name: string;
      }[] = [];
      editBoardInputs.columns.forEach((col: { id: string, name: string }, index) => {
        if (index !== indexToRemove) {
          newColumns.push(col)
        }
      });
      setEditBoardInputs({ ...editBoardInputs, columns: newColumns });
    }
  }

  return (
    <BoardContext.Provider
      value={{
        displayAddEditBoard,
        setDisplayAddEditBoard,
        addBoardInputs,
        setAddBoardInputs,
        editBoardInputs,
        setEditBoardInputs,
        onChangeAddBoards,
        onChangeEditBoards,
        displayDeleteModal,
        setDisplayDeleteModal
      }}>
      {children}
    </BoardContext.Provider>
  )
}

export const useBoardStateContext = () => useContext(BoardContext);