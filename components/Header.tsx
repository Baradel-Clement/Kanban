import React from 'react'
import ellipsis from '../public/assets/icon-vertical-ellipsis.svg';
import Image from 'next/image';
import { useHomeStateContext } from '../context/Home';
import { useBoardStateContext } from '../context/Board';
import { signOut } from 'next-auth/react';

const Header = () => {
  const { updateBoardModal, setUpdateBoardModal, boardSelectedId, showSidebar, boards } = useHomeStateContext();
  const { setDisplayAddEditBoard, setDisplayDeleteModal } = useBoardStateContext();
  let completeBoardSelected = boards.find((board) => board.id === boardSelectedId);

  return (
    <div className='flex flex-row items-center justify-start h-[9.5%] dark:bg-darkGrey'>
      <div className={`w-[20%] h-full flex items-center border-r border-linesLight dark:border-linesDark ${showSidebar === false ? 'border-b' : ''}`}>
        <svg onClick={() => signOut()} className='ml-[34px]' width="153" height="26" viewBox="0 0 153 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path className='dark:fill-white fill-black' fillRule="evenodd" clipRule="evenodd" d="M44.56 25V19.656L46.48 17.544L50.928 25H56.368L50.064 14.568L56.4 7.528H50.48L44.56 13.832V0.776001H39.76V25H44.56ZM63.92 25.384C66.096 25.384 67.8453 24.712 69.168 23.368V25H73.648V13.48C73.648 12.2213 73.3333 11.1173 72.704 10.168C72.0747 9.21867 71.1947 8.47733 70.064 7.944C68.9333 7.41067 67.632 7.144 66.16 7.144C64.304 7.144 62.6773 7.57067 61.28 8.424C59.8827 9.27733 58.928 10.4293 58.416 11.88L62.256 13.704C62.5547 12.936 63.0293 12.3173 63.68 11.848C64.3307 11.3787 65.0827 11.144 65.936 11.144C66.832 11.144 67.5413 11.368 68.064 11.816C68.5867 12.264 68.848 12.8187 68.848 13.48V13.96L64.016 14.728C61.9253 15.0693 60.368 15.72 59.344 16.68C58.32 17.64 57.808 18.856 57.808 20.328C57.808 21.9067 58.3573 23.144 59.456 24.04C60.5547 24.936 62.0427 25.384 63.92 25.384ZM63.376 21.416C63.7813 21.7147 64.2827 21.864 64.88 21.864C66.0747 21.864 67.0347 21.4907 67.76 20.744C68.4853 19.9973 68.848 19.0907 68.848 18.024V17.48L64.88 18.184C64.1973 18.312 63.6747 18.5307 63.312 18.84C62.9493 19.1493 62.768 19.592 62.768 20.168C62.768 20.7013 62.9707 21.1173 63.376 21.416ZM81.968 25V14.792C81.968 13.7893 82.2667 12.984 82.864 12.376C83.4613 11.768 84.2293 11.464 85.168 11.464C86.1067 11.464 86.8747 11.768 87.472 12.376C88.0693 12.984 88.368 13.7893 88.368 14.792V25H93.168V13.768C93.168 12.4453 92.8907 11.288 92.336 10.296C91.7813 9.304 91.008 8.53067 90.016 7.976C89.024 7.42133 87.8667 7.144 86.544 7.144C85.4347 7.144 84.4533 7.352 83.6 7.768C82.7467 8.184 82.096 8.81867 81.648 9.672V7.528H77.168V25H81.968ZM110.704 24.168C109.36 24.9787 107.835 25.384 106.128 25.384C105.061 25.384 104.064 25.208 103.136 24.856C102.208 24.504 101.435 23.9973 100.816 23.336V25H96.336V0.776001H101.136V9C102.373 7.76267 104.048 7.144 106.16 7.144C107.824 7.144 109.328 7.54933 110.672 8.36C112.016 9.17067 113.083 10.264 113.872 11.64C114.661 13.016 115.056 14.5573 115.056 16.264C115.056 17.9493 114.667 19.4853 113.888 20.872C113.109 22.2587 112.048 23.3573 110.704 24.168ZM105.552 21.064C104.251 21.064 103.189 20.6213 102.368 19.736C101.547 18.8507 101.136 17.6933 101.136 16.264C101.136 14.856 101.547 13.704 102.368 12.808C103.189 11.912 104.251 11.464 105.552 11.464C106.875 11.464 107.963 11.9173 108.816 12.824C109.669 13.7307 110.096 14.8773 110.096 16.264C110.096 17.672 109.669 18.824 108.816 19.72C107.963 20.616 106.875 21.064 105.552 21.064ZM128.528 23.368C127.205 24.712 125.456 25.384 123.28 25.384C121.403 25.384 119.915 24.936 118.816 24.04C117.717 23.144 117.168 21.9067 117.168 20.328C117.168 18.856 117.68 17.64 118.704 16.68C119.728 15.72 121.285 15.0693 123.376 14.728L128.208 13.96V13.48C128.208 12.8187 127.947 12.264 127.424 11.816C126.901 11.368 126.192 11.144 125.296 11.144C124.443 11.144 123.691 11.3787 123.04 11.848C122.389 12.3173 121.915 12.936 121.616 13.704L117.776 11.88C118.288 10.4293 119.243 9.27733 120.64 8.424C122.037 7.57067 123.664 7.144 125.52 7.144C126.992 7.144 128.293 7.41067 129.424 7.944C130.555 8.47733 131.435 9.21867 132.064 10.168C132.693 11.1173 133.008 12.2213 133.008 13.48V25H128.528V23.368ZM124.24 21.864C123.643 21.864 123.141 21.7147 122.736 21.416C122.331 21.1173 122.128 20.7013 122.128 20.168C122.128 19.592 122.309 19.1493 122.672 18.84C123.035 18.5307 123.557 18.312 124.24 18.184L128.208 17.48V18.024C128.208 19.0907 127.845 19.9973 127.12 20.744C126.395 21.4907 125.435 21.864 124.24 21.864ZM141.328 14.792V25H136.528V7.528H141.008V9.672C141.456 8.81867 142.107 8.184 142.96 7.768C143.813 7.352 144.795 7.144 145.904 7.144C147.227 7.144 148.384 7.42133 149.376 7.976C150.368 8.53067 151.141 9.304 151.696 10.296C152.251 11.288 152.528 12.4453 152.528 13.768V25H147.728V14.792C147.728 13.7893 147.429 12.984 146.832 12.376C146.235 11.768 145.467 11.464 144.528 11.464C143.589 11.464 142.821 11.768 142.224 12.376C141.627 12.984 141.328 13.7893 141.328 14.792Z" fill="#FFF" /><rect y="1" width="6" height="25" rx="2" fill="#635FC7" /><rect opacity="0.75" x="9" y="1" width="6" height="25" rx="2" fill="#635FC7" /><rect opacity="0.5" x="18" y="1" width="6" height="25" rx="2" fill="#635FC7" /></svg>
      </div>
      <div className='w-[80%] h-full flex justify-between items-center py-5 px-8 border-b border-b-linesLight dark:border-linesDark'>
        <h2 className='text-hXL text-black dark:text-white'>{completeBoardSelected?.name}</h2>
        <div className='w-[193px] flex justify-between items-center flex-row relative'>
          <button onClick={() => {
            if (completeBoardSelected?.columns.length !== 0) {
              console.log('new task')
            }
          }} className={`h-12 w-[164px] flex justify-center items-center rounded-[24px] font-bold ${completeBoardSelected?.columns.length === 0 ? 'cursor-not-allowed bg-purple/30' : 'bg-purple hover:bg-purpleHover'} text-white`}>+ Add New Task</button>
          <Image src={ellipsis} alt="ellipsis" className='h-[20px] cursor-pointer closeModalUpdateBoardOff' onClick={() => setUpdateBoardModal(!updateBoardModal)} />
          {
            updateBoardModal && (
              <div className='w-[192px] h-[94px] bg-white dark:bg-darkBg flex flex-col justify-between p-4 absolute top-[62px] z-10 rounded-lg shadow-[0_10px_20px_rgba(54,78,126,0.25)] closeModalUpdateBoardOff'>
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