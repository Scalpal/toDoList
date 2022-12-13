import React, { useContext, useEffect, useState, useCallback } from "react";
import { ActiveListContext, ListContext } from "../pages/_app";
import {CheckIcon} from '@heroicons/react/24/solid'


const Task = (props) => {

  const [activeList, setActiveList] = useContext(ActiveListContext);
  const [lists, setLists] = useContext(ListContext); 
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

  return (
    <React.Fragment>
      {tasks.length > 0 ? tasks.map(({ task, isFinished }, taskIndex) => {
        return (
          <div
            key={taskIndex}
            className="flex items-center gap-8 bg-slate-800 border-b-2 border-b-slate-500 px-4"
          >
            <label
              for={task}
              className='w-11 h-11 rounded-full border-2 p-2 my-4 duration-300'
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
            
            <h1
              className="text-slate-50"
            >
              {task}
            </h1>
          </div>
        )
        }) : 
        <h1> Liste vide pour le moment... </h1>
      }
    </React.Fragment>
  )
}


export default Task; 