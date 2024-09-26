import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import toast from "react-hot-toast";

interface IUser {
  email: string;
  password: string;
}
export const useAuthLogin = () => {
  const navigate = useNavigate();

  const { mutate, isError, isPending} = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: IUser) => loginUser(data),
    onSuccess: () => {
      toast.success("Вы вошли в аккаунт");
      navigate(`/${paths.videos}`);
    },
    onError: () => {
      console.log("Произошла ошибка при входе");
    },
  });

  return { mutate, isError, isPending };
};
