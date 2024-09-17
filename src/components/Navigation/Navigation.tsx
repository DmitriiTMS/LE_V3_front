import { Link } from "react-router-dom";
import { paths, pathsManage } from "../../constants/paths";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={paths.home}>Главная</Link>
        </li>
        <li>
          <Link to={paths.videos}>Видео</Link>
        </li>
        <li>
          <Link to={paths.login}>Вход</Link>
        </li>
        <li>
          <Link to={`${paths.manage}/${pathsManage.videos}`}>Админ</Link>
        </li>
      </ul>
    </nav>
  );
};
