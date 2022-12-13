import { PlusIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid'; 
import { PencilSquareIcon } from '@heroicons/react/24/solid'; 

const ActionNav = () => {

  

  return (
    <div
      className="border"
    >
      
      {/* Add task button */}
      <button
        className="p-3 border"
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