import { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCreateVideo } from "../../query/videos/useCreate";

interface IFormCreateVideo {
  handleClose: () => void;
}

// interface IError {
//   message: string
// }

export const FormCreateVideo: FC<IFormCreateVideo> = ({ handleClose }) => {
  const { mutate, isError, isPending, errorStatusCode } = useCreateVideo();

  const [videoInput, setVideoInput] = useState({
    title: "",
    description: "",
    url: "",
  });

  const [clickCreateBtn, setClickCreateBtn] = useState(false);

  const getVideoData = (e: any) => {
    setVideoInput({ ...videoInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(videoInput);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (clickCreateBtn) {
        if (!isError) {
          handleClose();
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  });

  return (
    <Form className="p-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="LamiEra введите название видео"
          name="title"
          onChange={getVideoData}
          value={videoInput.title}
        />
        {isError && (
          <Form.Text className="text-danger">
            Поле должно быть заполнено
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="LamiEra введите описание видео"
          name="description"
          onChange={getVideoData}
          value={videoInput.description}
        />
        {isError && (
          <Form.Text className="text-danger">
            Поле должно быть заполнено
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="file" name="url" onChange={getVideoData} />
      </Form.Group>
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
