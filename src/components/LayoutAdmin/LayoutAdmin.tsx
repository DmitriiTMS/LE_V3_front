import { Outlet } from "react-router-dom";
import { NavigationManage } from "../NavigationManage";

export const LayoutAdmin = () => {
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
};
