import React from 'react'
import { useHomeStateContext } from '../context/Home';
import { useBoardStateContext } from '../context/Board';
import { Board } from '../interfaces'

const Sidebar = () => {
  const { boards, boardSelectedId, setBoardSelectedId } = useHomeStateContext();
  const { setDisplayAddEditBoard } = useBoardStateContext();
  return (
    <div className='w-[20%] h-full flex flex-col justify-between bg-white border-r border-r-linesLight pt-4 pr-6 pb-8'>
      <div>
        <p className='text-hS text-mediumGrey tracking-S font-bold ml-8 mb-5'>ALL BOARDS ({boards.length})</p>
        <div>
          {
            boards.map((board) => (
              <div key={board.id} onClick={() => setBoardSelectedId(board.id)} className={`w-92/100 max-w-[276px] h-[48px] flex flex-row items-center pl-8 cursor-pointer text-mediumGrey font-bold ${boardSelectedId === board.id ? `bg-purple` : 'hover:bg-purpleHover/30'} group rounded-r-[100px]`}>
                <svg className={`mr-4 ${boardSelectedId === board.id ? 'fill-white' : 'fill-mediumGrey group-hover:fill-purple'}`} width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                <p className={`text-hM ${boardSelectedId === board.id ? 'text-white' : 'to-mediumGrey group-hover:text-purple'}`}>{board.name}</p>
              </div>
            ))
          }

          <div onClick={() => setDisplayAddEditBoard({ display: true, mode: 'ADD' })} className='w-[276px] h-[48px] flex flex-row items-center pl-8 cursor-pointer text-mediumGrey font-bold hover:last:text-purple hover:bg-purpleHover/30 hover:first:fill-purple group rounded-r-[100px]'>
            <svg className='mr-4 fill-purple' width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
            <p className='text-hM text-purple'>+ Create New Board</p>
          </div>
        </div>
      </div>
      <div className='w-92/100 h-[104px] flex flex-col justify-between bg bg-red' />
    </div>
  )
}

export default Sidebar