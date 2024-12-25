import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [userData , setUserData] = useState(null)
  let saveUserData = () => {
    const encodedToken = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ saveUserData ,userData}}>
      {props.children}
    </AuthContext.Provider>
  );
}
