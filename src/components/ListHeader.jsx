import { useEffect, useState, useCallback, useContext } from "react";
import { ActiveListContext, FormTypeContext, ListContext } from "../pages/_app";

const ListHeader = (props) => {

  const { listItem , index } = props; 

  // let totalTasks = listItem.thingsToDo.length;
  const [tasksFinishedCount, setTasksFinishedCount] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  
  // get the function to set list clicked, by using useContext 
  const [activeList, setActiveList] = useContext(ActiveListContext);
  const [lists, setLists] = useContext(ListContext);

  const [formType, setFormType] = useContext(FormTypeContext); 

  // Using this to get a copy of the list element at this index 
  const listIndex = lists.findIndex((element) => element.id === listItem.id);
  const copyListItem = lists[listIndex];

  let totalTasks = copyListItem.thingsToDo.length;

  let tasks = copyListItem.thingsToDo;   

  useEffect(() => {    
    let countFinishedTasks = 0; 

    tasks.map(({ isFinished }) => {
      
      if (isFinished) {
        countFinishedTasks += 1;
      }
    })

    setTasksFinishedCount(countFinishedTasks);
  }, [lists, tasks, setLists])    



  useEffect(() => {
    setProgressBarWidth((tasksFinishedCount / totalTasks) * 100); 
    
  },[tasksFinishedCount, totalTasks, progressBarWidth])

  const handleActiveList = useCallback(() => {
    setFormType("");
    setActiveList(listItem);
  })

  return (
    <div
      key={index}
      className="flex p-3 bg-slate-700 rounded-t-lg gap-3 border border-slate-500 cursor-pointer relative" 
      data-listindex={index}
      onClick={handleActiveList}
    >
      <p> {listItem.name} </p>
      <p>
        <span className="p-[3px] rounded rounded-tr-none rounded-br-none bg-lime-500">{tasksFinishedCount}</span>
        <span className="p-[3px] rounded rounded-tl-none rounded-bl-none bg-red-600">{totalTasks}</span>
      </p>
      
      {/* Progress bar */} 
      <div
        className={`bg-green-500 h-[0.20rem] rounded-t absolute bottom-0 left-0 duration-500`} 
        style={{width: `${progressBarWidth}%` }}
      ></div>
    </div>
  )

}

export default ListHeader;