import React from 'react'
import { useBoardStateContext } from '../context/Board';
import { useHomeStateContext } from '../context/Home';

const Board = () => {
  const { boardSelectedId, boards } = useHomeStateContext();
  const { setDisplayAddEditBoard } = useBoardStateContext();
  let completeBoardSelected = boards.find((board) => board.id === boardSelectedId);

  return (
    <>
      {
        completeBoardSelected?.columns.length === 0 && (
          <div className='w-[80%] h-full flex items-center justify-center flex-col'>
            <p className='text-mediumGrey text-hL mb-8'>This board is empty. Create a new column to get started.</p>
            <button onClick={() => setDisplayAddEditBoard({ display: true, mode: 'EDIT' })} type='button' className='w-[174px] h-[48px] bg-purple hover:bg-purpleHover text-white rounded-full'>+ Add new Column</button>
          </div>
        )
      }
      {
        completeBoardSelected?.columns.length !== 0 && (
          <div>
            {
              completeBoardSelected?.columns.map((col) => <p key={col.id} className='text-white'>{col.name}</p>)
            }
          </div>
        )
      }
    </>
  )
}

export default Board