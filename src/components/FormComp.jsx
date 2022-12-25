import { Formik, Form, setIn } from 'formik';
import * as yup from "yup";
import FormInput from './FormInput';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ActiveListContext, FormTypeContext, ListContext } from '../pages/_app';


const validationSchema = yup.object().shape({
  inputValue: yup.string().required().max(100, "Max 100 characters for list's name.").label("List")
});


const FormComp = () => {

  const [lists, setLists] = useContext(ListContext);
  const [activeList, setActiveList] = useContext(ActiveListContext);
  const [formType, setFormType] = useContext(FormTypeContext);

  const [inputInfos, setInputInfos] = useState([]);

  useEffect(() => {
    if (formType === "addList"){
      setInputInfos(['Nom de la liste', "Mettez le nom de la liste !"]);
    }

    if (formType === "editList"){
      setInputInfos(['Nom de la liste', "Mettez le nouveau nom de la liste !"]);
    }

    if (formType === "addTask"){
      setInputInfos(['Nom de la tâche', "Quelle est la tâche à faire ? "]);
    }

    if (formType.includes("editTask")){
      setInputInfos(['Nom de la tâche', "Modifiez le nom de la tâche !"]);
    }

  }, [formType]);


  const initialValues = useMemo(() => {
    const formTypeSubStr = formType.replace(/[0-9]/g, ''); 
    const taskIndex = formType.replace(/\D/g,''); 

    switch (formType) {
      case 'addList':
        return {
          inputValue: "",
        };
      
      case 'editList':
        return {
          inputValue: "",
        }
            
      case 'addTask': 
        return {
          inputValue: "",
        }
      
      // Edit task
      case formTypeSubStr + taskIndex: 
        return {
          inputValue: "",
        }
      
      default: 
        return {
          inputValue: "",
        }
    }
  }, [formType]);



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

  const handleSubmit = useCallback(({inputValue}, { resetForm }) => {

    console.log("handleSubmit appellée ! ");
    const formTypeSubStr = formType.replace(/[0-9]/g, ''); 
    const taskIndex = formType.replace(/\D/g,''); 

    let type = formType;
    switch (type) {
      case 'addList':

        const newList = {
          id: getAvailableId(),
          name: inputValue,
          thingsToDo: []
        }

        setLists((lists) => [...lists, newList]);

        setActiveList(newList); 

        resetForm();
        setFormType("");
        break; 
      
      case 'editList':        
        let updatedList = activeList; 
        updatedList.name = inputValue;

        setLists(lists.map((list) => {
          if (list.id === updatedList.id) {
            return updatedList; 
          }

          return (list);
        }))
        
        setFormType('');
        resetForm();
        break;
      
      case 'addTask':

        let newTask = {
          task: inputValue,
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
      
      
      // Edit task
      case formTypeSubStr + taskIndex :
        const taskIndexInt = Number.parseInt(taskIndex); 

        const updatedTask = {
          task: inputValue,
          isFinished: activeList.thingsToDo[taskIndexInt].isFinished
        }

        let updatedActiveListTasks = activeList; 
        updatedActiveListTasks.thingsToDo.splice(taskIndexInt, 1, updatedTask);

        setActiveList(updatedActiveListTasks); 

        setLists(lists.map((list) => {
          if (list.id === activeList.id) {
            return activeList;
          }

          return list;
        }))
        
        resetForm();
        setFormType("");
        break; 
    }

  }, [getAvailableId, formType, setLists, activeList, lists, setActiveList, setFormType]);

  return (

    <div>

      {formType.includes("edit") ? (
        <p
          className='text-center text-2xl mt-8 font-medium'
        >
          Nom {formType === "editList" ?
          `de la liste actuelle : ${activeList.name}` :
          `de la tâche actuelle : ${activeList.thingsToDo[Number.parseInt(formType.replace(/\D/g, ''))].task}`}
        </p>
      ): 
        null
      }

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4 p-4">

          {formType !== "" ?
            <FormInput
              name="inputValue"
              label={inputInfos[0]}
              placeholder={inputInfos[1]}
              type="text"
              className="border-2 border-indigo-700"
              /> 
              : 
            null
          }

          <button
            type="submit"
            className='bg-slate-700 w-fit mx-auto px-3 py-2 rounded-xl'
          >
            {formType.includes('add') ? "Ajouter" : "Modifier"}
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default FormComp; 