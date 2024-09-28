import { Navigate, Outlet } from "react-router-dom";
import { NavigationManage } from "../NavigationManage";
import { useProfile } from "../../query/users/useProfile";


export const LayoutAdmin = () => {
  const { user} = useProfile();
  

  if (user && user.role === "ADMIN") {
    return (
      <div>
        <div>
          <NavigationManage />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    );
  } 
  else if( user && user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  } 
};
