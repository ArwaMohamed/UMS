import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="">
          <SideBar/>
        </div>
        <div className="w-100 mainContent">
          <NavBar/>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
