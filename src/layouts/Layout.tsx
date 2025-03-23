import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Notification from "../components/Notification"

export default function Layout() {
  const {loadFromStorage} = useAppStore()

  useEffect(() => {
    loadFromStorage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
        <Header />

        <main className="mx-auto container py-16">
            <Outlet />
        </main>

        <Modal />
        <Notification />
    </>
  )
}
