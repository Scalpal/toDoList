import { PlusIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid'; 
import { PencilSquareIcon } from '@heroicons/react/24/solid'; 
import { useContext, useCallback } from 'react';
import { ActiveListContext, FormTypeContext, ListContext } from '../pages/_app';

const ActionNav = () => {

  const [formType, setFormType] = useContext(FormTypeContext);

  return (
    <div
      className="border"
    >
      
      {/* Add task button */}
      <button
        className="p-3 border"
        onClick={() => setFormType('addTask')}
      >
        <PlusIcon className="h-6 w-6 text-white"/>
      </button>

      {/* Edit list button */}
      <button
        className="p-3 border"
      >
        <PencilSquareIcon className="h-6 w-6 text-white"/>
      </button>

      {/* Delete list button */}
      <button
        className="p-3 border"
      >
        <TrashIcon className="h-6 w-6 text-white"/>
      </button>
    </div>
  )
}


export default ActionNav; 