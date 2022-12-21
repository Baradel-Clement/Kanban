import React from 'react'
import { useBoardStateContext } from '../context/Board';
import { useHomeStateContext } from '../context/Home';

const Board = () => {
  const { boardSelectedId, boards } = useHomeStateContext();
  const { setDisplayAddEditBoard } = useBoardStateContext();
  let completeBoardSelected = boards.find((board) => board.id === boardSelectedId);
  console.log(boards)
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
          <div className=' h-full flex p-6 overflow-x-scroll scrollbar'>
            {
              completeBoardSelected?.columns.map((col, index) => (
                <div key={col.id} className='min-w-[280px] flex flex-col mr-6'>
                  <div className='h-[15px] flex items-center mb-6'>
                    <span className={`w-[15px] h-[15px] ${index % 2 === 0 ? 'bg-[#49C4E5]' : 'bg-purple'} rounded-full mr-3`} />
                    <p className='font-bold text-mediumGrey tracking-S text-bL'>{col.name} ({col.tasks?.length})</p>
                  </div>
                  <div className='w-full flex flex-col'>
                    {
                      col.tasks?.map((task) => {
                        const completedSubtasks = 0;
                        return (
                          <div key={task.id} className='w-full flex flex-col bg-white dark:bg-darkGrey group px-4 py-6 cursor-pointer mb-5 last:mb-0 rounded-lg'>
                            <p className='text-hM font-bold dark:text-white group-hover:text-purple mb-2'>{task.title}</p>
                            <p className='text-hS font-bold text-mediumGrey'>{completedSubtasks} of {task.subtasks?.length} subtasks</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              ))
            }
            <div onClick={() => setDisplayAddEditBoard({ display: true, mode: 'EDIT' })} className='min-w-[280px] flex items-center justify-center group bg-[#E9EFFA]/50 hover:bg-[#E9EFFA] dark:bg-darkGrey/50 dark:hover:bg-darkGrey cursor-pointer rounded-md'>
              <p className='text-hXL text-mediumGrey group-hover:text-purple font-bold'>+ New Column</p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Board