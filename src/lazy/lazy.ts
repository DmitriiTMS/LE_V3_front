import { lazy } from "react";

export const HomePage = lazy(() =>
  import("../pages/HomePage").then(({ HomePage }) => ({ default: HomePage }))
);

export const VideoPage = lazy(() =>
  import("../pages/VideoPage").then(({ VideoPage }) => ({ default: VideoPage }))
);

export const LoginPage = lazy(() =>
  import("../pages/LoginPage").then(({ LoginPage }) => ({ default: LoginPage }))
);

export const RegisterPage = lazy(() =>
  import("../pages/RegisterPage").then(({ RegisterPage }) => ({
    default: RegisterPage,
  }))
);

export const VideoAdminPage = lazy(() =>
  import("../pages/VideoAdminPage").then(({ VideoAdminPage }) => ({ default: VideoAdminPage }))
);

export const UsersAdminPage = lazy(() =>
  import("../pages/UsersAdminPage").then(({ UsersAdminPage }) => ({ default: UsersAdminPage }))
);

export const ProtectedPage = lazy(() =>
  import("../components/ProtectedPage").then(({ ProtectedPage }) => ({ default: ProtectedPage }))
);

export const LayoutAdmin = lazy(() =>
  import("../components/LayoutAdmin").then(({ LayoutAdmin }) => ({ default: LayoutAdmin }))
);

export const UserPage = lazy(() =>
  import("../pages/UserPage").then(({ UserPage }) => ({ default: UserPage }))
);




