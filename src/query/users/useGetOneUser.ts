import { useQuery } from "@tanstack/react-query";
import { getByIdUser } from "../../api/api";

export const useGetOneUser = (userId: string) => {
  const { data: user } = useQuery({
    queryKey: ["get one user", userId],
    queryFn: () => getByIdUser(userId),
    enabled: !!userId
  });

  return { user };
};
