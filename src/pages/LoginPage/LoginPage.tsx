import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { paths } from "../../constants/paths";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthLogin } from "../../query/users/UseAuthLogin";


interface ILoginForm {
  email: string;
  password: string;
}


export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: "all",
  });

  const {mutate, isError, isPending } = useAuthLogin();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    mutate(data);
    
  };
  

  {
    isError && <div>Упс!!! Что-то пошло при создании аккаунта!!!</div>;
  }
  {
    isPending && <div>...Loading</div>;
  }

  
  return (
    <section className="container">
    <h1>Войти в аккаунт</h1>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
          })}
        />
        {errors && (
          <Form.Text className="text-danger">
            {errors.email?.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
            minLength: {
              value: 6,
              message: "Минимум 6 символов",
            },
          })}
        />
        {errors && (
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Войти в аккаунт
      </Button>
    </Form>
    <Link className="me-4" to={`/${paths.register}`}>
      Зарегистрировать аккаунт
    </Link>
    <Link to={paths.home}>Главная</Link>
  </section>
  );
};
