import { Formik, Form } from "formik"
import * as yup from "yup"
import FormInput from "./FormInput"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import useAppContext from "../helpers/context/useAppContext"
import Head from "next/head"

const validationSchema = yup.object().shape({
  inputValue: yup.string().required("This field cannot be empty ! ").min(3, "Min 3 characters").max(100, "Max 100 characters.").label("List")
})

const FormComp = () => {
  const router = useRouter()
  const currentRoute = router.asPath.replace("/", "")

  const { lists, setLists, activeList, setActiveList } = useAppContext()

  const [inputInfos, setInputInfos] = useState([])

  useEffect(() => {
    if (currentRoute === "addList") {
      setInputInfos(["Nom de la liste", "Mettez le nom de la liste !"])
    }

    if (currentRoute === "editList") {
      setInputInfos(["Nom de la liste", "Mettez le nouveau nom de la liste !"])
    }

    if (currentRoute === "addTask") {
      setInputInfos(["Nom de la tâche", "Quelle est la tâche à faire ? "])
    }

    if (currentRoute.includes("editTask")) {
      setInputInfos(["Nom de la tâche", "Modifiez le nom de la tâche !"])
    }
  }, [currentRoute])
  
  const initialValues = {
    inputValue: ""
  }

  const getAvailableId = useCallback(() => {
    const usedIds = []
    let availableId = null
    
    lists.map(({ id }) => {
      usedIds.push(id)
    })

    for (let i = 0; i < usedIds.length; i++) {
      let id = usedIds[i]

      if (!usedIds.includes(0)) {
        availableId = 0

        return availableId
      }

      if (!usedIds.includes(id + 1)) {
        availableId = id + 1

        return availableId
      }
    }
  }, [lists])

  const handleSubmit = useCallback(({ inputValue }, { resetForm }) => {
    let type = currentRoute

    switch (type) {
      case "addList": {
        const newList = {
          id: getAvailableId(),
          name: inputValue,
          thingsToDo: []
        }

        setLists((prevState) => [...prevState, newList])

        setActiveList(newList)

        resetForm()
        router.push("/")

        break
      }

      case "editList": {
        let updatedList = activeList
        updatedList.name = inputValue

        setLists((prevState) =>
          prevState.map((list) => {
            if (list.id === updatedList.id) {
              return updatedList
            }

            return list
          })
        )

        resetForm()
        router.push("/")

        break
      }
      
      case "addTask": {
        let newTask = {
          task: inputValue,
          isFinished: false
        }

        let updatedActiveList = activeList
        updatedActiveList.thingsToDo.push(newTask)

        setActiveList(updatedActiveList)

        setLists((prevState) =>
          prevState.map((list) => {
              if (list.id === activeList.id) {
                return activeList
              }
  
              return list
          })
        )

        resetForm()
        router.push("/")

        break
      }
      
      case "editTask/" + router.query.taskIndex: {
        const taskIndexInt = Number.parseInt(router.query.taskIndex)

        const updatedTask = {
          task: inputValue,
          isFinished: activeList.thingsToDo[taskIndexInt].isFinished
        }

        let updatedActiveListTasks = activeList
        updatedActiveListTasks.thingsToDo.splice(taskIndexInt, 1, updatedTask)

        setActiveList(updatedActiveListTasks)

        setLists((prevState) =>
          prevState.map((list) => {
            if (list.id === activeList.id) {
            return activeList
            }

            return list
          })
        )

        resetForm()
        router.push("/")

        break
      }        
    }
  }, [currentRoute, router, getAvailableId, setLists, setActiveList, activeList])

  const getPageTitle = () => {
    if (currentRoute === "addList") {
      return "Ajouter une liste"
    }

    if (currentRoute === "editList") {
      return `${activeList.name} : Modification` 
    }

    if (currentRoute === "addTask") {
      return `${activeList.name} : Ajouter une tâche`
    }

    if (currentRoute.includes("editTask")) {
      return `${activeList.name} : Modifier une tâche`
    }
  }

  useEffect(() => {
    const input = document.querySelector(`input[name="inputValue"]`)

    input.focus()
  }, [])

  return (
    <>
      <Head>
        <title> {getPageTitle()} </title>
      </Head>

      <div className="m-auto w-[80%] xs:m-0 xs:mt-8 xs:mx-auto">
        {currentRoute.includes("edit") ? (
          <p
            className="text-center text-2xl mt-8 font-medium"
          >
            {currentRoute === "editList" ?
              `Nom de la liste actuelle : ${activeList.name}` : null
            }
          </p>
        ) :
          null
        }

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid }) => (
            <Form className="flex flex-col gap-4 p-4 w-full">

              {currentRoute !== "" ?
                <FormInput
                  name="inputValue"
                  label={inputInfos[0]}
                  placeholder={inputInfos[1]}
                  type="text"
                  className="border-2 border-indigo-700"
                /> :
                null
              }

              <button
                type="submit"
                className={`bg-slate-700 duration-300 w-fit mx-auto px-3 py-2 rounded-xl ${!(dirty && isValid) ? "cursor-not-allowed opacity-30" : "cursor-pointer opacity-100"}`}
                disabled={!(isValid && dirty)}
              >
                {currentRoute.includes("add") ? "Ajouter" : "Modifier"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default FormComp 