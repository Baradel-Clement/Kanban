import React, { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import Header from './Header'
import { closeModalUpdateBoard } from '../utils/closeModal'
import { useHomeStateContext } from '../context/Home';
import { useBoardStateContext } from '../context/Board';
import AddEditBoard from './AddEditBoard';
import DeleteModal from './DeleteModal';
import { Toaster } from 'react-hot-toast';
import { useTaskStateContext } from '../context/Task';
import AddTask from './AddTask';
import ViewTask from './ViewTask';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Kanban' }: Props) => {
  const { updateBoardModal, setUpdateBoardModal, darkMode, setDarkMode } = useHomeStateContext();
  const { displayAddEditBoard, displayDeleteModal } = useBoardStateContext();
  const { displayAddTask, displayAddTaskSelectColumn, setDisplayAddTaskSelectColumn, viewTask, displayViewTaskChangeColumn, setDisplayViewTaskChangeColumn, displayModalEditDeleteTask, setDisplayModalEditDeleteTask } = useTaskStateContext();

  useEffect(() => {
    let darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(darkModePreference);
  }, [])

  return (
    <div className={`${darkMode ? 'dark' : ''} h-screen relative`} onClick={(e) => {
      if (updateBoardModal) {
        if (closeModalUpdateBoard('closeModalUpdateBoardOff', e)) {
          setUpdateBoardModal(false)
        }
      }
      if (displayAddTaskSelectColumn) {
        if (closeModalUpdateBoard('closeModalSelectColumnOff', e)) {
          setDisplayAddTaskSelectColumn(false)
        }
      }
      if (displayViewTaskChangeColumn) {
        if (closeModalUpdateBoard('closeModalViewTaskChangeColumnOff', e)) {
          setDisplayViewTaskChangeColumn(false)
        }
      }
      if (displayModalEditDeleteTask) {
        if (closeModalUpdateBoard('closeModalEditDeleteTaskOff', e)) {
          setDisplayModalEditDeleteTask(false)
        }
      }
    }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Toaster />
      <Header />
      {
        displayAddEditBoard.display && (<AddEditBoard />)
      }
      {
        displayDeleteModal.display && (<DeleteModal />)
      }
      {
        displayAddTask && (<AddTask />)
      }
      {
        viewTask.display && (<ViewTask />)
      }
      {children}
    </div>
  )
}


export default Layout
