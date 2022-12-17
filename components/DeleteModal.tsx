import React from 'react'
import { useHomeStateContext } from '../context/Home';
import { useBoardStateContext } from '../context/Board';
import { Board } from '../interfaces';
import toast from 'react-hot-toast';

const DeleteModal = () => {
  const { boards, setBoards, setBoardSelectedId } = useHomeStateContext();
  const { displayDeleteModal, setDisplayDeleteModal } = useBoardStateContext();
  let completeBoardSelected = boards.find((board) => board.id === displayDeleteModal.id);

  const deleteThis = async () => {
    if (displayDeleteModal.mode === 'board') {
      let body = { boardId: displayDeleteModal.id }
      let res = await fetch("api/board", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      const deletedBoard = await res.json();
      console.log("Deleting board successful", { deletedBoard });

      const newBoards: Board[] = [];
      boards.forEach((board) => {
        if (board.id !== deletedBoard.id) {
          newBoards.push(board)
        }
      });
      setBoards(newBoards);
      if (newBoards[0]) {
        setBoardSelectedId(newBoards[0].id);
      }
      setDisplayDeleteModal({ display: false, mode: '', id: '' });
      toast.success(`${deletedBoard.name} has been deleted !`);
    }
  }
  return (
    <>
      <div onClick={() => setDisplayDeleteModal({ display: false, mode: '', id: '' })} className='w-screen h-screen absolute bg-black/50 z-20 top-0' />
      <div className='w-[480px] min-h-[229px] flex flex-col justify-between p-8 rounded-md bg-white absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20'>
        <p className='text-hL text-red font-bold'>Delete this {displayDeleteModal.mode} ?</p>
        {
          displayDeleteModal.mode === 'board' && (
            <p className='text-bL text-mediumGrey'>Are you sure you want to delete the ‘{completeBoardSelected?.name}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
          )
        }
        <div className='w-full flex justify-between items-center'>
          <button onClick={() => deleteThis()} className='w-[200px] h-[40px] text-bL font-bold bg-red hover:bg-redHover text-white rounded-[20px]'>Delete</button>
          <button className='w-[200px] h-[40px] text-bL font-bold bg-purple/10 hover:bg-purple/25 text-purple rounded-[20px]'>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default DeleteModal