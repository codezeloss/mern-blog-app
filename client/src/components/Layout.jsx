import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <main className="p-3 max-w-[900px] mx-auto">
      <Header />
      <Outlet/>
    </main>
  );
}

export default Layout;