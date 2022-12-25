import React from 'react'
import { useBoardStateContext } from '../context/Board';
import { useHomeStateContext } from '../context/Home';
import { useTaskStateContext } from '../context/Task';
import { IColumn, Task } from '../interfaces';

const ViewTask = () => {
  const { viewTask, setViewTask, displayViewTaskChangeColumn, setDisplayViewTaskChangeColumn, displayModalEditDeleteTask, setDisplayModalEditDeleteTask, setDisplayEditTask } = useTaskStateContext();
  const { boards, setBoards, boardSelectedId } = useHomeStateContext();
  const { setDisplayDeleteModal } = useBoardStateContext();
  let completeBoardSelected = boards.find((board) => board.id === boardSelectedId);

  const getCompletedSubCount = (task: Task | null) => {
    let count = 0;
    task?.subtasks?.forEach((sub) => {
      if (sub.isCompleted) {
        count++;
      }
    });
    return count;
  }

  const editSubtask = async (subtaskIndex: number) => {
    const newSubtasks = viewTask.task?.subtasks?.map((sub, index) => {
      if (index === subtaskIndex) {
        return {
          ...sub,
          isCompleted: !sub.isCompleted
        }
      }
      else return { ...sub }
    })
    const task = {
      ...viewTask.task, subtasks: newSubtasks,
    };

    let res = await fetch("api/task", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })
    const newTask = await res.json();
    console.log("Editing Task successful", { newTask });

    const newBoards = boards.map((board) => {
      if (board.id === boardSelectedId) {
        const newTasks: Task[] = [];
        const newColumns: IColumn[] = [];
        board.columns.forEach((col) => {
          if (col.id === newTask[0].columnId) {
            col.tasks?.forEach((task) => {
              if (task.id === newTask[0].id) {
                newTasks.push(newTask[0]);
              }
              else newTasks.push(task)
            })
            newColumns.push({ ...col, tasks: newTasks })
          }
          else newColumns.push({ ...col })
        })
        return { ...board, columns: newColumns }
      }
      else return { ...board }
    });
    setBoards(newBoards);
    setViewTask({ ...viewTask, task: newTask[0] });
  }

  const editColumnTask = async (newColumnTask: IColumn) => {
    let task = {
      ...viewTask.task,
      status: newColumnTask.name,
      columnId: newColumnTask.id,
    }

    let res = await fetch("api/task", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, column: { id: newColumnTask.id, task } })
    })
    const newTask = await res.json();
    console.log("Editing Column Task Successful", { newTask });

    const newBoards = boards.map((board) => {
      if (board.id === boardSelectedId) {
        let newTasks: Task[] = [];
        const newColumns: IColumn[] = [];
        board.columns.forEach((col) => {
          newTasks = [];
          if (col.id === newTask[0].columnId) {
            col.tasks?.forEach((task) => newTasks.push(task));
            newTasks.push(newTask[0]);
            newColumns.push({ ...col, tasks: newTasks })
          }
          else if (col.id === viewTask.task?.columnId) {
            col.tasks?.forEach((task) => {
              if (task.id !== newTask[0].id) {
                newTasks.push(task)
              }
            })
            newColumns.push({ ...col, tasks: newTasks })
          }
          else newColumns.push({ ...col })
        })
        return { ...board, columns: newColumns }
      }
      else return { ...board }
    });
    setBoards(newBoards);
    setViewTask({ ...viewTask, task: newTask[0] });
  }

  return (
    <>
      <div onClick={() => setViewTask({ display: false, task: null })} className='w-screen h-screen absolute bg-black/50 z-20 top-0' />
      <div className='w-[480px] flex flex-col p-8 rounded-md bg-white dark:bg-darkGrey absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20'>
        <div className='w-full flex justify-between relative'>
          <p className='max-w-[380px] text-hL font-bold dark:text-white'>{viewTask.task?.title}</p>
          <svg onClick={() => setDisplayModalEditDeleteTask(true)} className='cursor-pointer closeModalEditDeleteTaskOff' width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308" /><circle cx="2.308" cy="10" r="2.308" /><circle cx="2.308" cy="17.692" r="2.308" /></g></svg>
          {
            displayModalEditDeleteTask && (
              <div className='w-[192px] h-[94px] flex flex-col justify-between bg-lightBg dark:bg-darkBg p-4 rounded-lg absolute z-30 top-[60px] -right-[96px] closeModalEditDeleteTaskOff'>
                <p onClick={() => {
                  if (viewTask.task) {
                    setDisplayEditTask({ display: true, task: viewTask.task });
                    setDisplayModalEditDeleteTask(false);
                    setViewTask({ display: false, task: null });
                  }
                }} className=' text-bL text-mediumGrey hover:underline cursor-pointer'>Edit Task</p>
                <p onClick={() => {
                  if (viewTask.task?.id) {
                    setDisplayDeleteModal({ display: true, mode: 'task', id: viewTask.task.id });
                    setDisplayModalEditDeleteTask(false);
                    setViewTask({ display: false, task: null });
                  }
                }} className=' text-bL text-red hover:underline cursor-pointer'>Delete Task</p>
              </div>
            )
          }
        </div>
        <p className='w-full text-hS text-mediumGrey leading-L my-6'>{viewTask.task?.description}</p>
        <p className='font-bold text-bM text-mediumGrey dark:text-white'>Subtasks ({getCompletedSubCount(viewTask.task)} of {viewTask.task?.subtasks?.length})</p>
        <div className='w-full flex flex-col mt-4'>
          {
            viewTask.task?.subtasks?.map((subtask, index) => (
              <div onClick={(e) => {
                const target = e.target as Element;
                if (!target.id.includes('inputCheckbox')) {
                  editSubtask(index)
                }
              }} key={subtask.title} className="w-full min-h-[40px] flex items-center p-3 rounded bg-lightBg dark:bg-darkBg hover:bg-purple/25 hover:dark:bg-purple/25 cursor-pointer mb-2 last:mb-0">
                <input id={`inputCheckbox-${index}`} checked={subtask.isCompleted} onClick={() => { }} onChange={() => { }} type="checkbox" className="min-w-4 w-4 h-4 text-purple cursor-pointer rounded outline-none focus:shadow-none focus:ring-0 mr-4" />
                <label htmlFor={`inputCheckbox-${index}`} className={`w-[360px] text-hS ${subtask.isCompleted ? 'text-mediumGrey line-through' : 'dark:text-white'} font-bold cursor-pointer`}>{subtask.title}</label>
              </div>
            ))
          }
        </div>
        <div className='w-full h-[68px] flex flex-col justify-between mt-6 relative'>
          <p className='font-bold text-bL text-mediumGrey dark:text-white'>Current Status</p>
          <div onClick={() => setDisplayViewTaskChangeColumn(true)} className={`w-full h-10 flex items-center justify-between px-4 py-2 border border-mediumGrey/25 hover:border-purple ${displayViewTaskChangeColumn ? 'border-purple' : ''} rounded cursor-pointer`}>
            <p className='text-bL dark:text-white'>{viewTask.task?.status}</p>
            <svg className={`${displayViewTaskChangeColumn ? 'rotate-180' : ''}`} width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" /></svg>
          </div>
          {
            displayViewTaskChangeColumn && (
              <div className='w-[416px] bg-white dark:bg-darkBg flex flex-col absolute top-[75px] z-10 rounded-lg shadow-[0_10px_20px_rgba(54,78,126,0.25)] closeModalViewTaskChangeColumnOff'>
                {
                  completeBoardSelected?.columns.map((col) => (
                    <div key={col.id} onClick={() => {
                      if (col.id !== viewTask.task?.columnId) {
                        editColumnTask(col);
                      }
                      setDisplayViewTaskChangeColumn(false);
                    }} className='w-full h-[50px] flex items-center group hover:bg-purple cursor-pointer hover:first:rounded-t-lg hover:last:rounded-b-lg px-4'>
                      <p className='text-bL text-mediumGrey group-hover:text-white'>{col.name}</p>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ViewTask