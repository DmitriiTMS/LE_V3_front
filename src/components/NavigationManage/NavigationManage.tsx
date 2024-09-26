import { Link } from "react-router-dom";
import { paths, pathsManage } from "../../constants/paths";
import { useProfile } from "../../query/users/UseProfile";

export const NavigationManage = () => {
  const { user } = useProfile();

  return (
    user?.role === "ADMIN" && (
      <nav>
        <ul>
          <li>
            <Link to={`/${paths.manage}/${pathsManage.users}`}>
              Пользователи
            </Link>
          </li>
          <li>
            <Link to={`/${paths.manage}/${pathsManage.videos}`}>Видео</Link>
          </li>
        </ul>
      </nav>
    )
  );
};
