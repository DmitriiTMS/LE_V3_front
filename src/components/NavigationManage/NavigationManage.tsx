import { Link } from "react-router-dom";
import { paths, pathsManage } from "../../constants/paths";

export const NavigationManage = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/${paths.manage}/${pathsManage.users}`}>Пользователи</Link>
        </li>
        <li>
          <Link to={`/${paths.manage}/${pathsManage.videos}`}>Видео</Link>
        </li>
      </ul>
    </nav>
  );
};
