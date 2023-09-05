import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function PageLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default PageLayout;
