import ListHeader from "./ListHeader"
import { useCallback } from "react"
import ActionNav from "./ActionNav"
import { useRouter } from "next/router"
import useAppContext from "../helpers/context/useAppContext"

const Layout = (props) => {
  const { children } = props
  const router = useRouter()

  const { lists, activeList } = useAppContext()
 
  const handleForm = useCallback(() => {
    router.push("/addList")
  }, [router])

  return (
    <div
      className="max-h-screen min-h-screen bg-slate-900 text-white xs:flex-col flex flex-col-reverse"
    >
      <div
        className="bg-slate-900"
      >
        <nav
          className="flex gap-[1px] p-0 overflow-scroll no-scrollbar"
        >
          {lists.map((listItem, index) => {
            const activeListIndex = lists.findIndex(list => list.id === activeList.id)
            const isActiveList = index === activeListIndex ? true : false

            let activeClassName = isActiveList ?
              "listHeader flex p-3 bg-slate-900 rounded-t-lg gap-3 border border-slate-500 cursor-pointer relative border-b-0"
              :
              "listHeader flex p-3 bg-slate-700 rounded-t-lg gap-3 border border-slate-500 cursor-pointer relative border-b-0"
            
            return (
              <ListHeader key={index} listItem={listItem} index={index} activeClassName={activeClassName} /> 
            )
          })}

          <button
            className="bg-slate-700 border border-b-0 border-slate-500 rounded-t-lg px-3 mx-4"
            onClick={() => handleForm()}
          >
            +
          </button>
        </nav>

        <ActionNav />
      </div>

      {children}

    </div>
  )
}

export default Layout