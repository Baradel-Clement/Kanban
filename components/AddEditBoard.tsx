import React, { useEffect, useState } from 'react'
import { useHomeStateContext } from '../context/Home';
import { useBoardStateContext } from '../context/Board';
import toast from 'react-hot-toast';

const AddEditBoard = () => {
  const { boards, setBoards, boardSelectedId, setBoardSelectedId } = useHomeStateContext();
  const { displayAddEditBoard, setDisplayAddEditBoard, addBoardInputs, setAddBoardInputs, editBoardInputs, setEditBoardInputs, onChangeAddBoards, onChangeEditBoards } = useBoardStateContext();
  const [errorColumnTasks, setErrorColumnTasks] = useState(false)

  let completeBoardSelected = boards.find((board) => board.id === boardSelectedId);

  useEffect(() => {
    if (displayAddEditBoard.mode === 'EDIT') {
      if (completeBoardSelected) {
        const inputs = { name: completeBoardSelected?.name, columns: completeBoardSelected?.columns.map((col) => ({ id: col.id, name: col.name })) }
        setEditBoardInputs({ name: completeBoardSelected?.name, columns: completeBoardSelected?.columns.map((col) => ({ id: col.id, name: col.name })) })
      }
    }
  }, [displayAddEditBoard])

  const addEditBoard = async (mode: string) => {
    setErrorColumnTasks(false);
    if (mode === 'ADD') {
      let board = {
        id: completeBoardSelected?.id,
        name: addBoardInputs.name,
        columns: addBoardInputs.columns.map((column) => ({
          name: column.name,
          tasks: [],
        }))
      }
      let res = await fetch("api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board)
      })
      const newBoard = await res.json();
      console.log("Creating board successful", { newBoard });

      const newBoards = boards.map((board) => ({ ...board }));
      newBoards.push({ ...newBoard[0] })
      setBoards(newBoards);
      setBoardSelectedId(newBoard[0].id);
      setDisplayAddEditBoard({ display: false, mode: '' });
      toast.success(`${newBoard[0].name} has been created !`);
    }
    else {
      let board = {
        id: completeBoardSelected?.id,
        name: editBoardInputs.name,
        columns: editBoardInputs.columns.map((column) => ({
          id: column.id,
          name: column.name,
        }))
      }
      let res = await fetch("api/board", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board)
      })

      const allResponses = await res.json();
      console.log("Editing board successful", { allResponses });
      const newBoard = {
        id: allResponses.updateBoard[0].id,
        name: allResponses.updateBoard[0].name,
        userId: allResponses.updateBoard[0].userId,
        columns: allResponses.updateColumns,
      }
      const newBoards = boards.map((board) => {
        if (board.id === newBoard.id) {
          return newBoard
        }
        else {
          return board;
        }
      });
      setBoards(newBoards);
      setBoardSelectedId(newBoard.id);
      setDisplayAddEditBoard({ display: false, mode: '' });
      toast.success(`${newBoard.name} has been edited !`);
    }

  }

  const addColumnEditMode = async () => {
    let body = { boardId: boardSelectedId };
    let res = await fetch("api/column", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const newColumn = await res.json();
    console.log("addColumnViaBoard succesful", { newColumn });
    onChangeEditBoards(newColumn.id, '', 'add')
  }

  const deleteColumnEditMode = async (columnId: string) => {
    let body = { columnId, };
    let res = await fetch("api/column", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (res.status === 500) {
      setErrorColumnTasks(true);
    }
    else {
      onChangeEditBoards(columnId, '', 'delete');
    }
  }

  return (
    <>
      <div onClick={() => setDisplayAddEditBoard({ display: false, mode: '' })} className='w-screen h-screen absolute bg-black/50 z-20 top-0' />
      <div className='w-[480px] min-h-[325px] flex flex-col p-8 rounded-md bg-white absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20'>
        <p className='text-hL font-bold '>{displayAddEditBoard.mode === 'ADD' ? 'Add New' : `Edit ${completeBoardSelected?.name}`} Board</p>
        <div className='w-full h-[63px] flex flex-col justify-between my-6'>
          <label className='text-hS text-mediumGrey' htmlFor='name'>Board Name</label>
          <input value={displayAddEditBoard.mode === 'ADD' ? addBoardInputs.name : editBoardInputs.name} onChange={(e) => {
            if (displayAddEditBoard.mode === 'ADD') {
              setAddBoardInputs({ ...addBoardInputs, name: e.target.value })
            }
            else {
              setEditBoardInputs({ ...editBoardInputs, name: e.target.value })
            }
          }} className='w-full h-[40px] px-4 py-2 text-bL border border-mediumGrey/25 focus:border-purple focus:border-2 focus:px-[15px] outline-0 rounded' id="board_name" name='name' />
        </div>
        <div className='w-full flex flex-col mb-3'>
          <p className='text-hS text-mediumGrey mb-3'>Columns</p>
          {
            displayAddEditBoard.mode === 'ADD' && addBoardInputs.columns.map((column) => (
              <div className='w-full flex justify-between items-center last:mb-0 mb-3' key={column.id}>
                <input value={column.name} onChange={(e) => onChangeAddBoards(column.id, e.target.value, 'changeName')} className='w-[385px] h-[40px] px-4 py-2 text-bL border border-mediumGrey/25 focus:border-purple focus:border-2 focus:px-[15px] outline-0 rounded' />
                <svg onClick={(e) => onChangeAddBoards(column.id, '', 'deleting')} className='cursor-pointer' width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
              </div>
            ))
          }
          {
            displayAddEditBoard.mode === 'EDIT' && editBoardInputs.columns.map((column) => (
              <div className='w-full flex justify-between items-center last:mb-0 mb-3' key={column.id}>
                <input value={column.name} onChange={(e) => onChangeEditBoards(column.id, e.target.value, 'changeName')} className='w-[385px] h-[40px] px-4 py-2 text-bL border border-mediumGrey/25 focus:border-purple focus:border-2 focus:px-[15px] outline-0 rounded' />
                {<svg onClick={(e) => deleteColumnEditMode(column.id)} className='cursor-pointer' width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>}
              </div>
            ))
          }
          {errorColumnTasks && <p className='text-hS text-red mb-3'>You cannot delete a column containing tasks</p>}
        </div>
        {<button onClick={() => {
          setErrorColumnTasks(false)
          if (displayAddEditBoard.mode === 'ADD') {
            onChangeAddBoards('0', '', 'add')
          }
          else {
            addColumnEditMode();
          }
        }} type='button' className='w-full h-[40px] bg-purple/10 hover:bg-purple/30 text-purple font-bold text-bL rounded-[20px]'>+ Add New Column</button>}
        <button onClick={() => addEditBoard(displayAddEditBoard.mode)} className='h-10 w-full rounded-[20px] font-bold bg-purple hover:bg-purpleHover text-white text-bL mt-6'>{displayAddEditBoard.mode === 'ADD' ? 'Create New' : 'Edit'} Board</button>
      </div>
    </>
  )
}

export default AddEditBoard