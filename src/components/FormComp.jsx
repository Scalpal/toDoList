import { Formik, Form, setIn } from 'formik';
import * as yup from "yup";
import FormInput from './FormInput';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ActiveListContext, FormTypeContext, ListContext } from '../pages/_app';


const validationSchema = yup.object().shape({
  listName: yup.string().required().max(100, "Max 100 characters for list's name.").label("List")
});

const initialValues = {
  name: ""
}


const FormComp = () => {

  const [lists, setLists] = useContext(ListContext);
  const [activeList, setActiveList] = useContext(ActiveListContext);
  const [formType, setFormType] = useContext(FormTypeContext);

  // const initialValues = useMemo(() => {
  //   switch (formType) {
  //     case 'addList':
  //       return {
  //         listName: "",
  //       };
            
  //     case 'addTask': 
  //       return {
  //         task: "",
  //       }
      
  //   }
  // }, [formType]);


  console.log(initialValues)


  const getAvailableId = useCallback(() => {
    const usedIds = [];
    let availableId = null;
    
    lists.map(({ id }) => {
      usedIds.push(id);
    })

    for (let i = 0; i < usedIds.length; i++) {
      let id = usedIds[i];

      if (!usedIds.includes(id + 1)) {
        availableId = id + 1;

        return availableId;
      }
    }
  }, [lists]);

  const handleSubmit = useCallback(({listName}, { resetForm }) => {

    console.log("handleSubmit appellée ! ");

    let type = formType;
    switch (type) {
      case 'addList':

        const newList = {
          id: getAvailableId(),
          name: listName,
          thingsToDo: []
        }

        setLists((lists) => [...lists, newList]);

        resetForm();
        setFormType("");
        break; 
      
      case 'addTask':

        let newTask = {
          task: listName,
          isFinished: false
        }

        let updatedActiveList = activeList;
        updatedActiveList.thingsToDo.push(newTask);

        setActiveList(updatedActiveList);

        setLists(lists.map((list) => {
          if (list.id === activeList.id) {
            return activeList;
          }
          return list;
        }))

        resetForm();
        setFormType("");
        break;
      
        // setActiveList({
        //   ...activeList,
        //   thingsToDo: [
        //     ...activeList.thingsToDo,
        //     newTask
        //   ]
        // });
      
      case 'editList':
        
        break; 
    }

  }, [getAvailableId, formType, setLists, activeList, lists, setActiveList, setFormType]);

  return (

    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validator={() => ({name:"c bon"})}
      >
        <Form className="flex flex-col gap-4 p-4">

          {formType === "addList" ?
            <FormInput
              name="listName"
              label="Nom"
              placeholder="Nom de la liste"
              type="text"
              className="border-2 border-indigo-700"
              /> 
              : 
            null
          }

          {formType === "addTask" ?
            <FormInput
              name="listName"
              label="Nom de la tâche"
              placeholder="La tâche"
              type="text"
              className="border-2 border-indigo-700"
              /> 
              : 
            null 
          }

          <button
            type="submit"
          >
            SUBMIT
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default FormComp; 