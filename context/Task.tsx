import React, { createContext, useContext, useState } from 'react';
import { TaskContextType } from '../interfaces';

type TaskContextProviderProps = {
  children: React.ReactNode;
}

export const TaskContext = createContext({} as TaskContextType)

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [displayAddTask, setDisplayAddTask] = useState(false);
  const [displayAddTaskSelectColumn, setDisplayAddTaskSelectColumn] = useState(false);

  const [addTaskInputs, setAddTaskInputs] = useState({
    title: '',
    description: '',
    subtasks: [{ id: '1', name: '' }],
    status: { value: '', columnId: '' }
  })
  const [addTaskErrors, setAddTaskErrors] = useState({
    title: false,
    description: false,
    subtasks: ['']
  })

  const onChangeAddTaskInputs = (inputName: string, mode: string, inputId: string, inputValue: string) => {
    if (inputName === 'subtasks') {
      if (mode === 'changeName') {
        const newSubtasks: {
          id: string;
          name: string;
        }[] = [];
        addTaskInputs.subtasks.forEach((sub) => {
          if (sub.id === inputId) {
            newSubtasks.push({ ...sub, name: inputValue })
          }
          else newSubtasks.push(sub)
        });
        setAddTaskInputs({ ...addTaskInputs, subtasks: newSubtasks });
      }
      else if (mode === 'add') {
        let newId = '0';
        const newSubtasks = [];
        addTaskInputs.subtasks.forEach((sub) => {
          newId = parseInt(newId) <= parseInt(sub.id) ? `${parseInt(sub.id) + 1}` : newId;
          newSubtasks.push({ ...sub })
        });

        newSubtasks.push({ id: newId, name: '' })
        console.log(newSubtasks)
        setAddTaskInputs({ ...addTaskInputs, subtasks: newSubtasks });
      }
      else if (mode === 'delete') {
        const indexToRemove = addTaskInputs.subtasks.findIndex((sub) => sub.id === inputId);
        const newSubtasks: {
          id: string;
          name: string;
        }[] = [];
        addTaskInputs.subtasks.forEach((sub: { id: string, name: string }, index) => {
          if (index !== indexToRemove) {
            newSubtasks.push(sub)
          }
        });
        setAddTaskInputs({ ...addTaskInputs, subtasks: newSubtasks });
      }
    }
  }

  const checkAddTaskFormErrors = () => {
    let errors = false;
    let newErrors: { title: boolean, description: boolean, subtasks: string[] } = {
      title: false, description: false, subtasks: []
    }

    if (addTaskInputs.title === '') {
      errors = true;
      newErrors.title = true;
    }
    if (addTaskInputs.description === '') {
      errors = true;
      newErrors.description = true;
    }

    addTaskInputs.subtasks.forEach((sub: { id: string, name: string }) => {
      if (sub.name === '') {
        errors = true;
        newErrors.subtasks.push(sub.id)
      }
    })

    setAddTaskErrors(newErrors);
    return errors;
  }

  return (
    <TaskContext.Provider
      value={{
        displayAddTask,
        setDisplayAddTask,
        displayAddTaskSelectColumn,
        setDisplayAddTaskSelectColumn,
        addTaskInputs,
        setAddTaskInputs,
        onChangeAddTaskInputs,
        checkAddTaskFormErrors,
        addTaskErrors,
        setAddTaskErrors
      }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskStateContext = () => useContext(TaskContext);