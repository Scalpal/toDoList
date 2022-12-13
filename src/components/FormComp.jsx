import { Formik, Form, setIn } from 'formik';
import * as yup from "yup";
import FormInput from './FormInput';
import { useCallback, useContext } from 'react';
import { FormTypeContext, ListContext } from '../pages/_app';

const initialValues = {
  id: 0,
  name: "",
  thingsToDo: []
}


const validationSchema = yup.object().shape({
  listName: yup.string().required().max(30, "Max 30 characters for list's name.").label("Task"),
});

const FormComp = () => {

  const [lists, setLists] = useContext(ListContext);
  const [formType, setFormType] = useContext(FormTypeContext);

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

  const handleSubmit = useCallback(({ listName }, { resetForm }) => {
    
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
        break; 
      
      case 'addTask':
        
        break;
      
      case 'editList':
        
        break; 
    }

  }, [getAvailableId, formType, setLists]);

  return (

    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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