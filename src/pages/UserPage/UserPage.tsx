import { useNavigate, useParams } from "react-router-dom";
import { useGetOneUser } from "../../query/users/useGetOneUser";
import { Form, ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useUpdateUser } from "../../query/users/useUpdareUser";

export const UserPage = () => {
  const { id } = useParams();

  const { user } = useGetOneUser(id!);
  const { mutate, isSuccess } = useUpdateUser(id!);

  const [isPremium, setPremium] = useState(false);

  const changeIsPremium = (e: any) => {
    const premium = Boolean(Number(e.target.value));
    if (premium) {
      setPremium(true);
    } else {
      setPremium(false);
    }
  };

  const updateUser = (e: any) => {
    e.preventDefault();
    mutate({
      isHasPremium: isPremium,
    });
  };

  return (
    <>
      {user && (
        <div>
          <div>
            <ListGroup className="mb-3" horizontal>
              <ListGroup.Item>Имя</ListGroup.Item>
              <ListGroup.Item variant="success">{user.name}</ListGroup.Item>
            </ListGroup>
            <ListGroup className="mb-3" horizontal>
              <ListGroup.Item>Email</ListGroup.Item>
              <ListGroup.Item variant="success">{user.email}</ListGroup.Item>
            </ListGroup>
            <ListGroup className="mb-3" horizontal>
              <ListGroup.Item>Instagram</ListGroup.Item>
              <ListGroup.Item variant="success">
                {user.instagramName}
              </ListGroup.Item>
            </ListGroup>
          </div>

          <Form onSubmit={updateUser}>
            <ListGroup className="mb-3" horizontal>
              <ListGroup.Item>Доступ к видео</ListGroup.Item>
              <ListGroup.Item variant="success">
                <Form.Select className="mb-3" onChange={changeIsPremium}>
                  {user.isHasPremium ? (
                    <>
                      <option value="1">Разрешён</option>
                      <option value="0">Запрещён</option>
                    </>
                  ) : (
                    <>
                      <option value="0">Запрещён</option>
                      <option value="1">Разрешён</option>
                    </>
                  )}
                </Form.Select>
              </ListGroup.Item>
            </ListGroup>

            <Button variant="primary" type="submit">
              Редактировать
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};
