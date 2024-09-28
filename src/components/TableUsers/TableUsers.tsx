import { Button, Table } from "react-bootstrap";
import { useGetAllUsers } from "../../query/users/useGetAllUsers";
import { useDeleteUser } from "../../query/users/useDeleteUser";
import { FC } from "react";
import { Link } from "react-router-dom";

interface IUser {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  isHasPremium: boolean;
  role: string;
}

export const TableUsers: FC<IUser> = () => {
  const { users } = useGetAllUsers();
  const { mutate } = useDeleteUser();

  const deleteUser = (id: string) => {
    mutate(id);
  };

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>№</th>
          <th>Дата регистрации</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Instagram</th>
          <th>Доступ к видео</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {users
          ? users.length > 0 &&
            users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.instagramName}</td>
                  <td>
                    {user.isHasPremium ? "Доступ разрешён" : "Доступ запрещён"}
                  </td>
                  <td>
                    <Link to={`${user.id}`}>
                    <Button className="mx-3" variant="warning">
                      Редактировать
                    </Button>
                    </Link>
                   
                    {user.role !== "ADMIN" && (
                      <Button
                        variant="danger"
                        onClick={() => deleteUser(user.id!)}
                      >
                        Удалить
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </Table>
  );
};
