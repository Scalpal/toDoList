import Head from "next/head"
import useAppContext from "../helpers/context/useAppContext"
import Task from "../components/Task"

export default function Home() {
  const { activeList } = useAppContext()

  return (
    <>
      <Head>
        <title>"{activeList ? activeList.name : ""}" list</title>
        <meta name="description" content="The best local to do list !" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Task />
    </>
  )
}

Home.title = "To do list"
