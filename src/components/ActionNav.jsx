import { PencilSquareIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid" 
import { useCallback } from "react"
import Link from "next/link"
import useAppContext from "../helpers/context/useAppContext"

const ActionNav = () => {
  const { lists, setLists, activeList, showNonFinished, setShowNonFinished } = useAppContext()

  const deleteList = useCallback(() => {
    const listHeader = document.querySelector(`.listHeader[data-listid="${activeList.id}"`)
    
    // If we delete the first list, we click on the next listHeader to set the activeList to the next list
    if (listHeader.dataset.listindex === "0") {
      listHeader.nextSibling.click()
    } else {
      listHeader.previousSibling.click()
    }

    setLists((prevState) =>prevState.filter(list => list.id !== activeList.id))
  }, [activeList, setLists]) 

  return (
    <div
      className="border-y border-slate-500 flex border-l-slate-500"
    >
      <div
        className="flex flex-row" 
      >
        {/* Add task button */}
        <Link
          href="addTask"
          className="flex justify-center items-center p-2 px-4 border-r border-slate-500"
        >
          <PlusIcon className="h-6 w-6 text-white"/>
        </Link>


        {/* Edit list button */}
        <Link
          className="flex justify-center items-center py-2 px-4 border-r border-slate-500"
          href="editList"
        >
          <PencilSquareIcon className="h-6 w-6 text-white"/>
        </Link>

        {/* Delete list button */}
        <button
          className="p-2 px-4 border-r border-slate-500"
          onClick={deleteList}
          disabled={lists.length === 1 ? true : false} 
        >
          <TrashIcon className="h-6 w-6 text-white"/>
        </button>
      </div>


      <label
        htmlFor="showNonFinished"
        className={`
          w-10 h-10 rounded-full border-2 p-2 my-3 mr-6 duration-300 ml-auto
          ${showNonFinished ? "bg-sky-800 border-sky-800" : "bg-slate-400 border-white"}
        `}
      >
        {showNonFinished ? <CheckIcon /> : null}
      </label>
      <input
        id="showNonFinished"
        className="hidden"
        type="checkbox"
        checked={showNonFinished ? true : false}
        onChange={() => {setShowNonFinished(showNonFinished ? false : true)}}
      />
    </div>
  )
}


export default ActionNav 