import { Link, useNavigate } from "react-router-dom";
import { paths, pathsManage } from "../../constants/paths";
import { Button } from "react-bootstrap";
import { useProfile } from "../../query/users/useProfile";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useProfile();

  const [auth, setAuth] = useState(false);

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [localStorage.getItem("user")]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={paths.home}>Главная</Link>
          </li>
          {auth && (
            <li>
              <Link to={paths.videos}>Видео</Link>
            </li>
          )}

          {user?.role === "ADMIN" && auth && (
            <li>
              <Link to={`${paths.manage}/${pathsManage.videos}`}>Админ</Link>
            </li>
          )}

          {!auth ? (
            <li>
              <Link to={paths.login}>Вход</Link>
            </li>
          ) : (
            <Button variant="danger" onClick={logout}>
              Выйти
            </Button>
          )}
        </ul>
      </nav>

      <div>{user && auth && <span>Привет, {user.name}</span>}</div>
    </>
  );
};
