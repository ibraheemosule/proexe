import s from "../assets/sass/layout.module.scss";
import TableComponent from "../views/TableComponent";
import AddNewUser from "../views/AddNewUser";
import { Routes, Route, Navigate } from "react-router-dom";

const Layout = () => {
  return (
    <main className={s.layout}>
      <h1>Dashboard</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/table" />}></Route>
        <Route path="/table" element={<TableComponent />} />
        <Route path="/add-new-user" element={<AddNewUser />} />
      </Routes>
    </main>
  );
};

export default Layout;
