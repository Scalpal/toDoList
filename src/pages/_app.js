import '../styles/globals.css';
import { useState, createContext, useContext } from "react"; 
import Layout from '../components/layout';
import Task from '../components/Task';
import FormComp from '../components/FormComp';

const initialList =
  [
    {
      id: 0,
      name: "Homework",
      thingsToDo: [
        {
          task: "Do math work",
          isFinished: false        },
        {
          task: "Do physics work", 
          isFinished: true
        },
        {
          task: "Do science work", 
          isFinished: true
        }
      ]
    },
    {
      id: 1,
      name: "Groceries",
      thingsToDo: [
        {
          task: "Buy tomatoes",
          isFinished: false
        },
        {
          task: "Buy zucchini",
          isFinished: true
        }
      ]
    }
  ];

export const ActiveListContext = createContext(null);
export const ListContext = createContext(null);
export const FormTypeContext = createContext(null); 

function MyApp({ Component, pageProps }) {

  const [lists, setLists] = useState(initialList); 
  const [activeList, setActiveList] = useState(initialList[0]); 
  const [formType, setFormType] = useState("");

  return (
    <FormTypeContext.Provider value={[formType, setFormType]}>
    <ListContext.Provider value={[lists, setLists]}>
    <ActiveListContext.Provider value={[activeList, setActiveList]}>
     
      <Layout> 
        {formType !== "" ? <FormComp /> : <Task {...pageProps} />}

      </Layout>

    </ActiveListContext.Provider>
    </ListContext.Provider>
    </FormTypeContext.Provider>

  )
}

export default MyApp
