import { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateVideo } from "../../query/videos/useUpdate";

interface IInputsForm {
  title: string;
  description: string;
  url: any;
}

interface IUpdate {
  title: string;
  description: string;
  url: string;
  id?: string;
  handleClose: () => void;
}

export const FormUpdateVideo: FC<IUpdate> = ({
  title,
  description,
  url,
  id,
  handleClose,
}) => {
  const [clickCreateBtn, setClickCreateBtn] = useState(false);

  const { mutate, isError, isPending } = useUpdateVideo(id!);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputsForm>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IInputsForm> = (data) => {
    mutate({ ...data, url: data.url[0] });
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setClickCreateBtn(false);

      if (
        !errors.title?.message &&
        !errors.description?.message &&
        !errors.url?.message
      ) {
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
            value: title,
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
            value: description,
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
      <Form.Group className="mb-3">
        <Form.Control
          type="file"
          {...register("url", {
            required: {
              value: true,
              message: "Поле должно быть заполнено",
            },
          })}
        />
        {errors.url?.message && (
          <Form.Text className="text-danger">Выберите файл</Form.Text>
        )}
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={() => setClickCreateBtn(true)}
      >
        Обновить
      </Button>
      {isPending && <div>...Loading</div>}

      {isError && <div>Упс!!! Что-то пошло не так при создании видео!!!</div>}

      {isError && <div>Упс!!! Видео с таким названием уже существует</div>}
    </Form>
  );
};
