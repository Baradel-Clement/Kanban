import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar';
import { useHomeStateContext } from '../context/Home';
import { Board } from '../interfaces';
import { getBoards } from './api/board';

type Props = {
  boards: Board[]
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
        <div className='w-[20%] h-full' />
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
