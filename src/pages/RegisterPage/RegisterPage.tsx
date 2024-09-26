import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { paths } from "../../constants/paths";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseAuthRegister } from "../../query/users/UseAuthRegister";

interface IRegisterForm {
  name: string;
  instagramName: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    mode: "all",
  });

  const { mutate, isError, isPending } = UseAuthRegister();

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
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
      <h1>Создание аккаунта</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Имя"
            {...register("name", {
              required: {
                value: true,
                message: "Поле обязательно для заполнения",
              },
            })}
          />
          {errors && (
            <Form.Text className="text-danger">
              {errors.name?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Имя Instagram"
            {...register("instagramName", {
              required: {
                value: true,
                message: "Поле обязательно для заполнения",
              },
            })}
          />
          {errors && (
            <Form.Text className="text-danger">
              {errors.instagramName?.message}
            </Form.Text>
          )}
        </Form.Group>

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
          Создать аккаунт
        </Button>
      </Form>
      <Link className="me-4" to={`/${paths.login}`}>
        Войти в аккаунт
      </Link>
      <Link to={paths.home}>Главная</Link>
    </section>
  );
};
