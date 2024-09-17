import { Button, Form } from "react-bootstrap";

export const FormCreateVideo = () => {
  return (
    <Form className="p-3">
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="LamiEra введите название видео"
        />
        <Form.Text className="text-muted">
          Поле обязательное для заполнения
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="LamiEra введите описание видео"
        />
        <Form.Text className="text-muted">
          Поле обязательное для заполнения
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Создать
      </Button>
    </Form>
  );
};
