import { useQuery } from "@tanstack/react-query";
import { getProfileUser } from "../../api/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useProfile = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setAuth(true);
    }
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileUser(),
    enabled: auth ? true : false,
  });

  return { user, isLoading };
};
