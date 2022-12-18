import { PlusIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid'; 
import { PencilSquareIcon } from '@heroicons/react/24/solid'; 
import { useContext, useCallback } from 'react';
import { ActiveListContext, FormTypeContext, ListContext } from '../pages/_app';

const ActionNav = () => {

  const [formType, setFormType] = useContext(FormTypeContext);
  const [lists, setLists] = useContext(ListContext);
  const [activeList, setActiveList] = useContext(ActiveListContext);

  const deleteList = useCallback(() => {
    const previousOrNextListIndex = activeList.id - 1 >= 0 ? activeList.id - 1 : activeList.id + 1; 

    setActiveList(lists[previousOrNextListIndex]); 

    setLists(lists.filter(list => list.id !== activeList.id));

  }, [lists, activeList, setActiveList, setLists]); 

  return (
    <div
      className="border-y border-slate-500"
    >
      
      {/* Add task button */}
      <button
        className="p-3 border-r border-slate-500"
        onClick={() => setFormType('addTask')}
      >
        <PlusIcon className="h-6 w-6 text-white"/>
      </button>

      {/* Edit list button */}
      <button
        className="p-3 border-r border-slate-500"
        onClick={() => setFormType('editList')}
      >
        <PencilSquareIcon className="h-6 w-6 text-white"/>
      </button>

      {/* Delete list button */}
      <button
        className="p-3 border-r border-slate-500"
        onClick={deleteList}
        disabled={lists.length === 1 ? true : false} 
      >
        <TrashIcon className="h-6 w-6 text-white"/>
      </button>
    </div>
  )
}


export default ActionNav; 