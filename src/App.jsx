
import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import axios from "./util/axios.custiomize"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    const fetchHellWorld = async() => {
      const res = await axios.get(`/v1/api`);
    }
    fetchHellWorld();
  }, [])
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
