import React from 'react'
import logo from '../public/assets/logo-light.svg';
import ellipsis from '../public/assets/icon-vertical-ellipsis.svg';
import Image from 'next/image';
import { useHomeStateContext } from '../context/Home';
import { useBoardStateContext } from '../context/Board';

const Header = () => {
  const { updateBoardModal, setUpdateBoardModal, boardSelectedId } = useHomeStateContext();
  const { setDisplayAddEditBoard, setDisplayDeleteModal } = useBoardStateContext();
  return (
    <div className='flex flex-row items-center justify-start h-[9.5%]'>
      <div className='w-[20%] h-full flex items-center border-r border-r-linesLight'>
        <Image src={logo} alt="logo" className='ml-[34px]' />
      </div>
      <div className='w-[80%] h-full flex justify-between items-center py-5 px-8 border-b border-b-linesLight'>
        <h2 className='text-hXL text-black'>Platform Launch</h2>
        <div className='w-[193px] flex justify-between items-center flex-row relative'>
          <button className='h-12 w-[164px] flex justify-center items-center rounded-[24px] font-bold bg-purple hover:bg-purpleHover text-white'>+ Add New Task</button>
          <Image src={ellipsis} alt="ellipsis" className='h-[20px] cursor-pointer closeModalUpdateBoardOff' onClick={() => setUpdateBoardModal(!updateBoardModal)} />
          {
            updateBoardModal && (
              <div className='w-[192px] h-[94px] bg-white flex flex-col justify-between p-4 absolute top-[62px] z-10 rounded-lg shadow-[0_10px_20px_rgba(54,78,126,0.25)] closeModalUpdateBoardOff'>
                <p onClick={() => {
                  setDisplayAddEditBoard({ display: true, mode: 'EDIT' });
                  setUpdateBoardModal(false);
                }} className='h-[24px] text-mediumGrey text-bL cursor-pointer hover:underline'>Edit Board</p>
                <p onClick={() => {
                  setDisplayDeleteModal({ display: true, mode: 'board', id: boardSelectedId });
                  setUpdateBoardModal(false);
                }} className='h-[24px] text-bL text-red cursor-pointer hover:underline'>Delete Board</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Header