import s from "../assets/sass/wrapper.module.scss";
import { Link } from "react-router-dom";

const Wrapper = ({ children, title }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper_title}>
        <h2>{title}</h2>
        {title === "list user" && (
          <Link to="/add-new-user">
            <button>Add New</button>
          </Link>
        )}
      </div>
      <div className={s.wrapper_content}>{children}</div>
    </div>
  );
};

export default Wrapper;
