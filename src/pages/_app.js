import "../styles/globals.css"
import Layout from "../components/Layout"
import { AppContextProvider } from "../helpers/context/useAppContext"

function MyApp({ Component }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component />
      </Layout>
    </AppContextProvider>
  )
};


export default MyApp
