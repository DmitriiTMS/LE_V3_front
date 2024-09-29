import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IUser {
  name?: string;
  email?: string;
  instagramName?: string;
  isHasPremium: boolean;
}

export const useUpdateUser = (userId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error, isSuccess } = useMutation({
    mutationKey: ["update user", userId],
    mutationFn: (data: IUser) => updateUser(userId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      navigate("/manage/users");
      toast.success("Пользователь обновлён");
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      toast.error("При обновлении пользователя что-то пошло не так!!!");
    },
  });

  return { mutate, isError, isPending, error, isSuccess };
};
