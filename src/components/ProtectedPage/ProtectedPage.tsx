import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export const ProtectedPage = ({ children }: any) => {
  const location = useLocation();

  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const pathName = location.pathname === "/login" || location.pathname === "/register";
   
    if(pathName && !token) {
      setLogin(false)
    } else if(token && pathName) {
      setLogin(true)
      setAuth(true)
      navigate('/')
    }
  }, [navigate, location.pathname]);


 
  return !login || auth ? <div>{children}</div> : null;
};
