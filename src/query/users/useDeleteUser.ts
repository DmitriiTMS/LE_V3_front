import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/api";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["delete user"],
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
    },
  });

  return { mutate, isError, isPending, error };
};
