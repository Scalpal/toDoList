import "../styles/globals.css"
import { useState, createContext } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import Task from "../components/Task"

const initialList = [
  {
    id: 0,
    name: "Homework",
    thingsToDo: [
      {
        task: "Do math work",
        isFinished: false
      },
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
]

export const ListContext = createContext(null)
export const ActiveListContext = createContext(null)
export const ShowNonFinishedContext = createContext(null)

function MyApp({ Component }) {
  const router = useRouter()
  const currentRoute = router.asPath

  const [lists, setLists] = useState(initialList)
  const [activeList, setActiveList] = useState(initialList[0])
  const [showNonFinished, setShowNonFinished] = useState(false)

  return (
    <ListContext.Provider value={[lists, setLists]}>
      <ActiveListContext.Provider value={[activeList, setActiveList]}>
        <ShowNonFinishedContext.Provider value={[showNonFinished, setShowNonFinished]}>
     
          <Layout activeList={activeList} lists={lists}>
        
            {currentRoute !== "/" ? <Component /> : <Task activeList={activeList} setActiveList={setActiveList} />}

          </Layout>
          
        </ShowNonFinishedContext.Provider>
      </ActiveListContext.Provider>
    </ListContext.Provider>
  )
};


export default MyApp
