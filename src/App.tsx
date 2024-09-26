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
  ProtectedPage,
} from "./lazy/lazy";
import { paths, pathsManage } from "./constants/paths";

function App() {
  return (
    <>
      <Suspense fallback={"...Loading"}>
        <Routes>
          <Route path={paths.home} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path={paths.videos}
              element={
                <ProtectedPage>
                  <VideoPage />
                </ProtectedPage>
              }
            />
            <Route
              path={paths.manage}
              element={
                <ProtectedPage>
                  <LayoutAdmin />
                </ProtectedPage>
              }
            >
              <Route path={pathsManage.videos} element={<VideoAdminPage />} />
              <Route path={pathsManage.users} element={<UsersAdminPage />} />
            </Route>
          </Route>
          <Route
            path={paths.login}
            element={
              <ProtectedPage>
                <LoginPage />
              </ProtectedPage>
            }
          />
          <Route
            path={paths.register}
            element={
              <ProtectedPage>
                <RegisterPage />
              </ProtectedPage>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
