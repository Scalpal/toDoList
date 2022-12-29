import ListHeader from "./ListHeader";
import { useCallback, useContext, useEffect } from "react";
import ActionNav from "./ActionNav";
import { ListContext } from '../pages/_app';
import Link from 'next/link';
import { useRouter } from 'next/router';


const Layout = (props) => {
  
  const { children, activeList, lists } = props; 
  const router = useRouter();
  const currentRoute = router.asPath;

  const handleForm = useCallback(() => {
    router.push("/addList");

  }, [router])

  return (
    <div
      className="h-screen max-h-screen"
    >
      <div
        className="sticky top-0"
      >
        <nav
          className="flex gap-[1px] p-0 overflow-scroll"
        >
          {lists.map((listItem, index) => {
            const activeListIndex = lists.findIndex(list => list.id === activeList.id); 

            const isActiveList = index === activeListIndex ? true : false; 

            let activeClassName = isActiveList ?
              "flex p-3 bg-slate-900 rounded-t-lg gap-3 border border-slate-500 cursor-pointer relative border-b-0"
              :
              "flex p-3 bg-slate-700 rounded-t-lg gap-3 border border-slate-500 cursor-pointer relative border-b-0"
            
            return (
              <ListHeader key={index} listItem={listItem} index={index} activeClassName={activeClassName} /> 
            )
          })}

          <button
            className="bg-slate-700 border border-b-0 border-slate-500 rounded-t-lg px-3 ml-4"
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

export default Layout; 