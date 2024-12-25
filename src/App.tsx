import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import MasterLayout from "./Components/MasterLayout/MasterLayout";
import Home from "./Components/Home/Home";
import UserList from "./Components/UserList/UserList";
import AddUser from "./Components/AddUser/AddUser";
import Profile from "./Components/Profile/Profile";
import { ToastContainer } from 'react-toastify';
function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "users-list", element: <UserList /> },
        { path: "add-user", element: <AddUser /> },
        { path: "add-user/:id", element: <AddUser /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
