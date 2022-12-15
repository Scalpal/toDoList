import ListHeader from "./ListHeader";
import { useCallback, useContext, useEffect } from "react";
import ActionNav from "./ActionNav";
import { FormTypeContext, ListContext } from '../pages/_app';
import Link from 'next/link';


const Layout = (props) => {
  
  const { children } = props; 
  
  const [lists, setLists] = useContext(ListContext);
  const [formType, setFormType] = useContext(FormTypeContext); 
    
  const testList = {
    name: "test",
    thingsToDo: [
      {
        task: "Do test work",
        isFinished: true
      }
    ]
  }

  // const addList = useCallback(() => {

  //   setLists([...lists, testList]);

  // }, [lists, setLists])

  const handleForm = useCallback((e) => {
    const formTypeDataset = e.target.dataset.formtype; 

    setFormType(formTypeDataset);
  }, [setFormType])

    console.log(formType)

  return (
    <div
      className="h-screen max-h-screen"
    >
      <div
        className="sticky top-0"
      >
        <nav
          className="border-2 border-solid border-sky-100 flex gap-[1px] p-0 overflow-scroll"
        >
          {lists.map((listItem, index) => {

            return (
              <ListHeader key={index} listItem={listItem} index={index} /> 
            )
          })}

          <button
            className="bg-slate-700 border border-slate-500 rounded-lg px-3 ml-4"
            data-formtype="addList"
            onClick={(e) => handleForm(e)}
          >
            +
          </button>
        </nav>

        <ActionNav />

      </div>

      {/* the selected to do list is supposed to be here */}
      {children}

    </div>
  )
}

export default Layout; 