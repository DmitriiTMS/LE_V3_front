import { useParams } from "react-router-dom";
import { useGetOneUser } from "../../query/users/useGetOneUser";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const UserPage = () => {
  const { id } = useParams();

  const { user } = useGetOneUser(id!);

  return (
    <>
      {user && (
        <div>
          <div>
            <div>
              <span>Имя -----</span>
              <span>{user.name}</span>
            </div>
            <div>
              <span>Email ---- </span>
              <span>{user.email}</span>
            </div>
          </div>

          <Form>
            <Form.Select>
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

            <Button variant="primary" type="submit">
              Редактировать
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};
