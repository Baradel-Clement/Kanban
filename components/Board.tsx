import React from 'react'
import { useBoardStateContext } from '../context/Board';
import { useHomeStateContext } from '../context/Home';
import { useTaskStateContext } from '../context/Task';
import { DragDropContext, Draggable, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import { IColumn } from '../interfaces';

const reorderColumnList = (sourceCol: IColumn, startIndex: number, endIndex: number) => {
  const newTasks = sourceCol.tasks?.map((task) => task);
  if (newTasks) {
    const [removed] = newTasks.splice(startIndex, 1);
    newTasks.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      tasks: newTasks,
    };

    return newColumn;
  }
};

const Board = () => {
  const { boardSelectedId, boards, setBoards } = useHomeStateContext();
  const { setDisplayAddEditBoard } = useBoardStateContext();
  const { setViewTask } = useTaskStateContext();
  let completeBoardSelected = boards.find((board) => board.id === boardSelectedId);

  const onDragEnd = async (source: { droppableId: string, index: number }, destination: { droppableId: string, index: number }, draggableId: string) => {
    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different position
    const sourceCol = completeBoardSelected?.columns.find((col => col.id === source.droppableId));
    const destinationCol = completeBoardSelected?.columns.find((col => col.id === destination.droppableId));

    if (sourceCol && destinationCol) {
      if (sourceCol.id === destinationCol.id) {
        const newColumn = reorderColumnList(
          sourceCol,
          source.index,
          destination.index
        );
        console.log(newColumn)

        /* let res = await fetch("api/column", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newColumn)
        })
        const editedColumn = await res.json();
        console.log("Editing Column successful", { editedColumn }); */


        const newBoards = boards.map((board) => {
          if (board.id === completeBoardSelected?.id) {
            const newColumns: IColumn[] = [];
            board.columns.forEach((col) => {
              if (col.id === newColumn?.id) {
                newColumns.push(newColumn)
              }
              else newColumns.push(col)
            })
            return { ...board, columns: newColumns }
          }
          else return board;
        })
        setBoards(newBoards);

        return;
      }
    }
    else return;


    // If the user moves from one column to another
    const startTask = sourceCol.tasks?.map((task) => task);
    const endTask = destinationCol.tasks?.map((task) => task);
    if (startTask && endTask) {
      const [removed] = startTask.splice(source.index, 1);
      const newStartCol = {
        ...sourceCol,
        tasks: startTask,
      };

      endTask.splice(destination.index, 0, removed);
      const newEndCol = {
        ...destinationCol,
        tasks: endTask,
      };

      const newBoards = boards.map((board) => {
        if (board.id === completeBoardSelected?.id) {
          const newColumns: IColumn[] = [];
          board.columns.forEach((col) => {
            if (col.id === newStartCol.id) {
              newColumns.push(newStartCol)
            }
            else if (col.id === newEndCol.id) {
              newColumns.push(newEndCol)
            }
            else newColumns.push(col)
          })
          return { ...board, columns: newColumns }
        }
        else return board;
      })
      setBoards(newBoards);

      let task = endTask.find(task => task.id === draggableId);
      if (task) {
        task.status = destinationCol.name;
        task.columnId = destinationCol.id;
      }

      let res = await fetch("api/task", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task })
      })
      const newTask = await res.json();
      console.log("Editing Column Task Successful", { newTask });
    }
  };

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
            <DragDropContext onDragEnd={(e: any) => onDragEnd(e.source, e.destination, e.draggableId)}>
              {
                completeBoardSelected?.columns.map((col, index) => (
                  <div key={col.id} className='min-w-[280px] w-[280px] flex flex-col mr-6'>
                    <div className='h-[15px] flex items-center mb-6'>
                      <span className={`w-[15px] h-[15px] ${index % 2 === 0 ? 'bg-[#49C4E5]' : 'bg-purple'} rounded-full mr-3`} />
                      <p className='font-bold text-mediumGrey tracking-S text-bL'>{col.name} ({col.tasks?.length})</p>
                    </div>
                    <Droppable droppableId={col.id} type={"COLUMN"}>
                      {(droppableProvided, droppableSnapshot) => (
                        <div className='w-full flex flex-col' ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                          {
                            col.tasks?.map((task, index) => {
                              let completedSubtasks = 0;
                              task.subtasks?.forEach(sub => sub.isCompleted ? completedSubtasks += 1 : null)
                              return (
                                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                  {(draggableProvided, draggableSnapshot) => (
                                    <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps} onClick={() => setViewTask({ display: true, task: task, })} className='w-full flex flex-col bg-white dark:bg-darkGrey group px-4 py-6 cursor-pointer mb-5 last:mb-0 rounded-lg'>
                                      <p className='text-hM font-bold dark:text-white group-hover:text-purple mb-2'>{task.title}</p>
                                      <p className='text-hS font-bold text-mediumGrey'>{completedSubtasks} of {task.subtasks?.length} subtasks</p>
                                    </div>
                                  )}
                                </Draggable>
                              )
                            })
                          }
                          <div className='w-full h-[20px] bg-transparent' />
                          {droppableProvided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))
              }
            </DragDropContext>
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