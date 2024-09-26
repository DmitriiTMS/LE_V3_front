import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import toast from "react-hot-toast";

interface IUser {
  name: string;
  email: string;
  instagramName: string;
  password: string;
}
export const UseAuthRegister = () => {
  const navigate = useNavigate();
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IUser) => registerUser(data),
    onSuccess() {
      toast.success("Вы успешно зарегистрировали аккаунт");
      navigate(`/${paths.videos}`);
    },
    onError() {
      console.log("Произошла ошибка при регистрации");
    },
  });

  return { mutate, isError, isPending };
};
