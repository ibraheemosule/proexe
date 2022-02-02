import s from "../assets/sass/layout.module.scss";

const Layout = () => {
  return (
    <main className={s.layout}>
      <h1>Dashboard</h1>
      <div className={s.layout_table_wrapper}>
        <div className={s.layout_table_wrapper_title}>
          <h2>User List</h2>
          <button>Add New</button>
        </div>
      </div>
    </main>
  );
};

export default Layout;
