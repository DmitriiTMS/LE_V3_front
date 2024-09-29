import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/api";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isPending, error } = useMutation({
    mutationKey: ["delete user"],
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (data) => {
      toast.success(`Пользователь ${data.name} удалён`);
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      toast.error("При удалении пользователя что-то пошло не так!!!");
    },
  });

  return { mutateAsync, isError, isPending, error };
};
