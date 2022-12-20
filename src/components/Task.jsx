import React, { useContext, useEffect, useState, useCallback } from "react";
import { FormTypeContext, ListContext, ShowNonFinishedContext } from "../pages/_app";
import { CheckIcon , TrashIcon } from '@heroicons/react/24/solid'


const Task = (props) => {

  const { activeList, setActiveList } = props; 

  const [lists, setLists] = useContext(ListContext);
  const [formType, setFormType] = useContext(FormTypeContext);
  const [showNonFinished, setShowNonFinished] = useContext(ShowNonFinishedContext);

  const tasks = activeList.thingsToDo;

  const handleChange = (e) => {
    const isChecked = e.currentTarget.checked; 
    const taskIndex = Number.parseInt(e.currentTarget.dataset.taskindex); 

    let updatedList = activeList;
    
    updatedList.thingsToDo.map((task, index) => {
      if (taskIndex === index) {
        updatedList.thingsToDo[taskIndex].isFinished = isChecked ? true : false;
      }
    })

    setLists(lists.map((list) => {
      if (list.id === updatedList.id) {
        return updatedList;
      }

      return list;
    })) 

    return;
  }

  const handleEditTask = useCallback((taskIndex) => {
    setFormType("editTask" + taskIndex);

  }, [setFormType])

  const handleDeleteTask = useCallback((taskIndex) => {
    let updatedActiveList = activeList; 
    updatedActiveList.thingsToDo.splice(taskIndex, 1);

    setActiveList(updatedActiveList);

    setLists(lists.map((list) => {
      if (list.id === activeList.id) {
        return activeList;
      }

      return list;
    }));

  }, [activeList, lists, setActiveList, setLists]); 

  return (
    <React.Fragment>
      {tasks.length > 0 ? tasks.map(({ task, isFinished }, taskIndex) => {
    
        return (
          <div
            key={taskIndex}
            className="flex items-center relative gap-8 bg-slate-800 border-b border-b-slate-500 px-4"
            style={{ display: showNonFinished && isFinished === true ? "none" : "flex" }}
          >
            <label
              htmlFor={task}
              className='w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] max-w-[2.75rem] max-h-[2.75rem] 
              rounded-full border-2 p-2 my-4 duration-300'
              style={{
                backgroundColor: isFinished ? 'rgb(7 89 133)' : 'rgb(148 163 184)',
                borderColor: isFinished ? 'rgb(7 89 133)' : 'rgb(255 255 255)',
              }}
            >
              {isFinished ? <CheckIcon /> : null}
            </label>
            <input
              id={task}
              className="hidden"
              type="checkbox"
              checked={isFinished ? true : false}
              data-taskindex={taskIndex}
              onChange={(e) => {handleChange(e)}}
            />
            
            <p
              className="text-slate-50 cursor-pointer my-3"
              onClick={() => handleEditTask(taskIndex)}
            >
              {task}
            </p>

            <TrashIcon
              className="w-9 h-9 ml-auto cursor-pointer"
              onClick={() => {handleDeleteTask(taskIndex)}}
            /> 
          </div>
        )
      }) :
      (
        <div
          className="h-full flex flex-auto justify-center items-center"
        >
          <p
            className="text-5xl border-4 p-4 rounded-2xl bg-slate-800 whitespace-normal" 
          >
            Liste vide pour le moment...
          </p>
        </div>
      )

      }
    </React.Fragment>
  )
}


export default Task; 