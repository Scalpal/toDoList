import React, { useContext, useCallback } from "react" 
import { ListContext, ShowNonFinishedContext } from "../pages/_app" 
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid" 
import Link from "next/link" 
 
const Task = (props) => {
  const { activeList, setActiveList } = props  

  const [lists, setLists] = useContext(ListContext) 
  const [showNonFinished ] = useContext(ShowNonFinishedContext) 

  const tasks = activeList.thingsToDo 

  const handleChange = useCallback((e) => {
    const isChecked = e.currentTarget.checked  
    const taskIndex = Number.parseInt(e.currentTarget.dataset.taskindex)  

    let updatedList = activeList 
    
    updatedList.thingsToDo.map((task, index) => {
      if (taskIndex === index) {
        updatedList.thingsToDo[taskIndex].isFinished = isChecked ? true : false 
      }
    }) 

    setLists(lists.map((list) => {
      if (list.id === updatedList.id) {
        return updatedList 
      }

      return list 
    }))  

    return 
  }, [setLists , lists , activeList]) 

  const handleDeleteTask = useCallback((taskIndex) => {
    let updatedActiveList = activeList  
    updatedActiveList.thingsToDo.splice(taskIndex, 1) 

    setActiveList(updatedActiveList) 

    setLists(lists.map((list) => {
      if (list.id === activeList.id) {
        return activeList 
      }

      return list 
    })) 
  }, [activeList, lists, setActiveList, setLists])  

  return (
    <React.Fragment>
      {tasks.length > 0 ? tasks.map(({ task, isFinished }, taskIndex) => {
        return (
          <div
            key={taskIndex}
            className="group/task flex items-center relative gap-8 bg-slate-800 border-b border-b-slate-500 px-4"
            style={{ display: showNonFinished && isFinished === true ? "none" : "flex" }}
          >
            <label
              htmlFor={taskIndex}
              className="w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] max-w-[2.75rem] max-h-[2.75rem] 
              rounded-full border-2 p-2 my-4 duration-300"
              style={{
                backgroundColor: isFinished ? "rgb(7 89 133)" : "rgb(148 163 184)",
                borderColor: isFinished ? "rgb(7 89 133)" : "rgb(255 255 255)",
              }}
            >
              {isFinished ? <CheckIcon /> : null}
            </label>
            <input
              id={taskIndex}
              className="hidden"
              type="checkbox"
              checked={isFinished ? true : false}
              data-taskindex={taskIndex}
              onChange={(e) => {handleChange(e) }}
            />
            
            <Link
              className="text-slate-50 cursor-pointer my-3"
              href={`editTask/${taskIndex}`}
            >
              {task}
            </Link>

            <TrashIcon
              className="invisible group-hover/task:visible w-9 h-9 ml-auto mr-2 cursor-pointer"
              onClick={() => {handleDeleteTask(taskIndex) }}
            /> 
          </div>
        ) 
      }) :
        (
          <div
            className="h-full flex flex-auto justify-center items-center"
          >
            <p
              className="text-5xl border-4 p-4 mt-24 rounded-2xl bg-slate-800 whitespace-normal" 
            >
            Liste vide pour le moment...
            </p>
          </div>
        )

      }
    </React.Fragment>
  ) 
} 


export default Task  