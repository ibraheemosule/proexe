import s from "../assets/sass/layout.module.scss";
import TableComponent from "./TableComponent";

const Layout = () => {
  return (
    <main className={s.layout}>
      <h1>Dashboard</h1>
      <TableComponent />
    </main>
  );
};

export default Layout;
