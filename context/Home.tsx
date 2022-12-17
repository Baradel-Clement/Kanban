import React, { createContext, useContext, useState } from 'react';
import { Board, HomeContextType } from '../interfaces';

type HomeContextProviderProps = {
  children: React.ReactNode;
}

export const HomeContext = createContext({} as HomeContextType)

export const HomeContextProvider = ({ children }: HomeContextProviderProps) => {
  const [updateBoardModal, setUpdateBoardModal] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [boardSelectedId, setBoardSelectedId] = useState('');

  return (
    <HomeContext.Provider
      value={{
        updateBoardModal,
        setUpdateBoardModal,
        boards,
        setBoards,
        boardSelectedId,
        setBoardSelectedId,
      }}>
      {children}
    </HomeContext.Provider>
  )
}

export const useHomeStateContext = () => useContext(HomeContext);