import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => { 
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState(    {
    id: 1,
    name: "Renommez la !",
    thingsToDo: []
  })
  const [showNonFinished, setShowNonFinished] = useState(false)

  useEffect(() => {
    const localStorageLists = localStorage.getItem("lists")

    if (!localStorageLists) {
      const newInitialList = [
        {
          id: 1,
          name: "Renommez la !",
          thingsToDo: []
        }
      ]

      localStorage.setItem("lists", JSON.stringify(newInitialList))
      setLists(newInitialList)
      
      return
    }

    setLists(JSON.parse(localStorageLists))
  }, [setLists])

  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem("lists", JSON.stringify(lists))
    }
  }, [lists])


  return (
    <AppContext.Provider value={{ lists, setLists, activeList, setActiveList, showNonFinished, setShowNonFinished }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext)

  return { ...context }
}

export default useAppContext