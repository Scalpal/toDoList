import { PlusIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid'; 
import { PencilSquareIcon, CheckIcon } from '@heroicons/react/24/solid'; 
import { useContext, useCallback, useState } from 'react';
import { ActiveListContext, ListContext, ShowNonFinishedContext } from '../pages/_app';
import Link from 'next/link';

const ActionNav = () => {

  const [lists, setLists] = useContext(ListContext);
  const [activeList, setActiveList] = useContext(ActiveListContext);
  const [showNonFinished, setShowNonFinished] = useContext(ShowNonFinishedContext);

  const deleteList = useCallback(() => {
    const previousOrNextListIndex = activeList.id - 1 >= 0 ? activeList.id - 1 : activeList.id + 1; 

    setActiveList(lists[previousOrNextListIndex]); 

    setLists(lists.filter(list => list.id !== activeList.id));

  }, [lists, activeList, setActiveList, setLists]); 

  return (
    <div
      className="border-y border-slate-500 flex"
    >
      <div
        className='flex flex-row' 
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
        className='w-10 h-10 rounded-full border-2 p-2 my-3 mr-6 duration-300 ml-auto'
        style={{
          backgroundColor: showNonFinished ? 'rgb(7 89 133)' : 'rgb(148 163 184)',
          borderColor: showNonFinished ? 'rgb(7 89 133)' : 'rgb(255 255 255)',
        }}
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


export default ActionNav; 