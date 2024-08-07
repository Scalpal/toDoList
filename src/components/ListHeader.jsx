import { useRouter } from "next/router" 
import { useEffect, useState, useCallback } from "react" 
import useAppContext from "../helpers/context/useAppContext"

const ListHeader = (props) => {
  const { listItem, index, activeClassName } = props  
  const router = useRouter() 
  
  const [tasksFinishedCount, setTasksFinishedCount] = useState(0) 
  const [progressBarWidth, setProgressBarWidth] = useState(0) 
  
  const { setActiveList, lists, setLists } = useAppContext()

  // Using this to get a copy of the list element at this index 
  const listIndex = lists.findIndex((element) => element.id === listItem.id) 
  const copyListItem = lists[listIndex] 

  let totalTasks = copyListItem.thingsToDo.length 
  let tasks = copyListItem.thingsToDo    

    const handleActiveList = useCallback((e) => {
    router.push("/") 
    setActiveList(listItem) 

    const header = e.currentTarget 

    header.scrollIntoView({behavior: "smooth" , block: "center"})
  }, [listItem, setActiveList, router]) 

  useEffect(() => {    
    let countFinishedTasks = 0  

    tasks.map(({ isFinished }) => {
      if (isFinished) {
        countFinishedTasks += 1 
      }
    }) 

    setTasksFinishedCount(countFinishedTasks) 
  }, [lists, tasks, setLists])     


  useEffect(() => {
    setProgressBarWidth((tasksFinishedCount / totalTasks) * 100)  

    // Goes to infinite when 0
    if (progressBarWidth > 100) {
      setProgressBarWidth(0) 
    }
  },[tasksFinishedCount, totalTasks, progressBarWidth]) 

  return (
    <div
      key={index}
      className={activeClassName}
      data-listindex={index}
      data-listid={listItem.id}
      onClick={(e) => { handleActiveList(e) }}
    >
      <p className="whitespace-nowrap"> {listItem.name} </p>
      <p>
        <span className="p-[3px] rounded rounded-tr-none rounded-br-none bg-lime-500">{tasksFinishedCount}</span>
        <span className="p-[3px] rounded rounded-tl-none rounded-bl-none bg-red-600">{totalTasks}</span>
      </p>
      
      {/* Progress bar */} 
      <div
        className={"bg-green-500 h-[0.20rem] rounded-t absolute bottom-0 left-0 duration-500"} 
        style={{width: `${progressBarWidth}%`}}
      ></div>
    </div>
  )
} 

export default ListHeader 