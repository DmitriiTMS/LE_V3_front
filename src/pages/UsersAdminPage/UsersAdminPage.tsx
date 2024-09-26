import { useNavigate } from "react-router-dom";
import { useProfile } from "../../query/users/UseProfile";
import { useEffect } from "react";

export const UsersAdminPage = () => {
  const { user } = useProfile();
  const naigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      naigate("/");
      return;
    }
  }, []);
  return <h1>UsersAdminPage</h1>;
};
