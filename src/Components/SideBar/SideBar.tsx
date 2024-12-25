import { AiOutlineUserAdd } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsers } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./SideBar.module.css";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "../Context/AuthContext";
export default function SideBar() {
   const {userData} = useContext(AuthContext)
  let [collapsed, setCollapsed] = useState(false);
  let collapsedMenu = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate()
  const location = useLocation();
  const logout = ()=>{
    navigate("/login")
    localStorage.clear()

  }
  return (
    <Sidebar collapsed={collapsed} className="vh-100">
      <Menu className="v-100">
        {collapsed && (
          <span onClick={collapsedMenu} className="d-block text-center">
            <GiHamburgerMenu />
          </span>
        )}
        <div
          className={`d-flex justify-content-between align-items-center ${
            collapsed ? "mx-1" : "mx-4"
          }  `}
        >
          <h1 className={`${style.loginHeader} m-0`}>UMS</h1>
          {!collapsed && (
            <span onClick={collapsedMenu}>
              <GiHamburgerMenu />
            </span>
          )}
        </div>

        <div className="text-center mt-5">
          <img
            className={`${collapsed ? "w-75" : ""} rounded-circle`}
            src={userData?.image}
            alt={"profile"}
          />
          <p className="fw-bold p-0">{userData?.firstName} {userData?.lastName}</p>
          <span className={`${style.role} fw-medium`}>Admin</span>
        </div>
        <div className={`d-flex flex-column justify-content-between ${style.menuItemsFlex}`}>
          <div>
          <MenuItem
              active={location.pathname === "/dashboard"}
              component={<Link to="/dashboard" />}
              icon={<FaHome />}
            >
              Home
            </MenuItem>
            <MenuItem
              active={location.pathname === "/dashboard/users-list"}
              component={<Link to="/dashboard/users-list" />}
              icon={<FaUsers />}
            >
              Users
            </MenuItem>
            <MenuItem
              active={location.pathname === "/dashboard/add-user"}
              component={<Link to="/dashboard/add-user" />}
              icon={<AiOutlineUserAdd />}
            >
              Add User
            </MenuItem>
            <MenuItem
              active={location.pathname === "/dashboard/profile"}
              component={<Link to="/dashboard/profile" />}
              icon={<CgProfile />}
            >
              Profile
            </MenuItem>
          </div>
          <div>
            <MenuItem
              onClick={logout}
              icon={<HiOutlineLogout />}
            >
              Logout
            </MenuItem>
          </div>
        </div>
      </Menu>
    </Sidebar>
  );
}
