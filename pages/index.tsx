import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar';
import Board from '../components/Board';
import { useHomeStateContext } from '../context/Home';
import { IBoard } from '../interfaces';
import { getBoards } from './api/board';

type Props = {
  boards: IBoard[]
}

const IndexPage = ({ boards }: Props) => {
  const { setBoards, setBoardSelectedId } = useHomeStateContext();
  useEffect(() => {
    if (boards[0]) {
      setBoards(boards)
      setBoardSelectedId(boards[0].id);
    }
  }, [boards])
  return (
    <Layout title="Kanban Home">
      <div className='width-full h-[90.5%] flex flex-row bg-lightBg dark:bg-darkBg dark: relative'>
        <Sidebar />
        <Board />
      </div>

    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    const boards = await getBoards(session.user.id)
    const updatedboards = JSON.parse(JSON.stringify(boards))
    return { props: { boards: updatedboards } }
  }
  else return {
    props: {},
    redirect: {
      permanent: false,
      destination: "/login"
    }
  }
}


export default IndexPage
