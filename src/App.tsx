import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LayoutAdmin } from "./components/LayoutAdmin/LayoutAdmin";
import { Suspense } from "react";
import {
  VideoAdminPage,
  HomePage,
  LoginPage,
  RegisterPage,
  VideoPage,
  UsersAdminPage,
} from "./lazy/lazy";
import { paths, pathsManage } from "./constants/paths";

function App() {
  return (
    <>
      <Suspense fallback={"...Loading"}>
        <Routes>
          <Route path={paths.home} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={paths.videos} element={<VideoPage />} />
            <Route path={paths.login} element={<LoginPage />} />
            <Route path={paths.register} element={<RegisterPage />} />
            <Route path={paths.manage} element={<LayoutAdmin />}>
              <Route path={pathsManage.videos} element={<VideoAdminPage />} />
              <Route path={pathsManage.users} element={<UsersAdminPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
