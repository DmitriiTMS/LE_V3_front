import { Link, useNavigate } from "react-router-dom";
import { paths, pathsManage } from "../../constants/paths";
import { Button, Container, Navbar } from "react-bootstrap";
import { useProfile } from "../../query/users/useProfile";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const Navigation = () => {
  const navigate = useNavigate();
  const { user } = useProfile();

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
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to={paths.home}>Главная</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            {auth && (
              <li>
                <Link to={paths.videos}>Видео</Link>
              </li>
            )}
          </Navbar.Brand>
          <Navbar.Brand>
            {user?.role === "ADMIN" && auth && (
              <li>
                <Link to={`${paths.manage}/${pathsManage.videos}`}>Админ</Link>
              </li>
            )}
          </Navbar.Brand>

          <Navbar.Toggle />

          <div>
            <Navbar.Text>
              <div>{user && auth && <span>Привет, {user.name}</span>}</div>
            </Navbar.Text>
          </div>

          <Navbar.Collapse className="justify-content-end align-items-center">
            <Navbar.Brand>
              {!auth ? (
                <li>
                  <Link to={paths.login}>Вход</Link>
                </li>
              ) : (
                <Button variant="danger" onClick={logout}>
                  Выйти
                </Button>
              )}
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
