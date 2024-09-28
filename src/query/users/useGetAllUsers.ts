import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/api";


export const useGetAllUsers = () => {
  const {
    data: users,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => getAllUsers(),
  });

  return { users, isLoading, isError };
};
