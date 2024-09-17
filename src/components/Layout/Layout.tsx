import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <>
      <Header />

      <main>
        {/* Испавить!!!!!!!!!!!!!!! container */}
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
};
