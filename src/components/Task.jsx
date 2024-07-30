import React, { useCallback } from "react" 
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid" 
import Link from "next/link" 
import useAppContext from "../helpers/context/useAppContext"
 
const Task = () => {
  const { setLists, activeList, setActiveList, showNonFinished } = useAppContext()
  
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

    setLists((prevState) =>
      prevState.map((list) => {
        if (list.id === updatedList.id) {
          return updatedList 
        }

        return list 
    }))  

    return 
  }, [setLists, activeList]) 

  const handleDeleteTask = useCallback((taskIndex) => {
    let updatedActiveList = activeList  
    updatedActiveList.thingsToDo.splice(taskIndex, 1) 

    setActiveList(updatedActiveList) 

    setLists((prevState) => 
      prevState.map((list) => {
        if (list.id === activeList.id) {
          return activeList 
        }

        return list 
      })
    )
  }, [activeList, setActiveList, setLists])  

  return (
    <main className={`flex flex-col xs:flex-col ${tasks.length > 0 ? "justify-end xs:justify-start" : "justify-center"} flex-1 overflow-scroll no-scrollbar`}>
      {tasks.length > 0 ? tasks.map(({ task, isFinished }, taskIndex) => {
        return (
          <div
            key={taskIndex}
            className={`
              group/task items-center relative gap-8 bg-slate-800 border-b border-b-slate-500 px-4 w-full
              ${showNonFinished && isFinished === true ? "hidden" : "flex"}
            `}
          >
            <label
              htmlFor={taskIndex}
              className={`
                w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] max-w-[2.75rem] max-h-[2.75rem] rounded-full border-2 p-2 my-4 duration-300
                ${isFinished ? "bg-sky-800 border-sky-800" : "bg-slate-400 border-white"}
              `}
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
          <p
            className="w-fit xs:text-5xl border-4 p-4 rounded-2xl bg-slate-800 whitespace-normal text-2xl mx-auto" 
          >
          Liste vide pour le moment...
          </p>
        )

      }
    </main>
  ) 
} 


export default Task  