import { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCreateVideo } from "../../query/videos/useCreate";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormCreateVideo {
  handleClose: () => void;
}

interface IInputsForm {
  title: string;
  description: string;
  url: string;
}

export const FormCreateVideo: FC<IFormCreateVideo> = ({ handleClose }) => {
  const [clickCreateBtn, setClickCreateBtn] = useState(false);

  const { mutate, isError, isPending, errorStatusCode } = useCreateVideo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputsForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IInputsForm> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setClickCreateBtn(false);

      if (!errors.title?.message && !errors.description?.message) {
        if (clickCreateBtn) {
          if (!isError) {
            handleClose();
          }
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <Form className="p-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="LamiEra введите название видео"
          {...register("title", {
            required: {
              value: true,
              message: "Поле должно быть заполнено",
            },
            minLength: {
              value: 2,
              message: "Минимум два символа",
            },
          })}
        />
        {isError && (
          <Form.Text className="text-danger">
            Поле должно быть заполнено
          </Form.Text>
        )}
        {errors && (
          <Form.Text className="text-danger">{errors.title?.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="LamiEra введите описание видео"
          {...register("description", {
            required: {
              value: true,
              message: "Поле должно быть заполнено",
            },
            minLength: {
              value: 2,
              message: "Минимум два символа",
            },
          })}
        />
        {isError && (
          <Form.Text className="text-danger">
            Поле должно быть заполнено
          </Form.Text>
        )}
        {errors && (
          <Form.Text className="text-danger">
            {errors.description?.message}
          </Form.Text>
        )}
      </Form.Group>
      {/* <Form.Group className="mb-3">
        <Form.Control type="file" {...register("url")} />
      </Form.Group> */}
      <Button
        variant="primary"
        type="submit"
        onClick={() => setClickCreateBtn(true)}
      >
        Создать
      </Button>
      {isPending && <div>...Loading</div>}

      {isError && errorStatusCode === 400 && (
        <div>Упс!!! Что-то пошло не так при создании видео!!!</div>
      )}

      {isError && errorStatusCode === 409 && (
        <div>Упс!!! Видео с таким названием уже существует</div>
      )}
    </Form>
  );
};
