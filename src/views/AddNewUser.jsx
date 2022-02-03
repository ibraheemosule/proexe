import Wrapper from "../components/Wrapper";
import s from "../assets/sass/add-new-user.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { fetched } from "../store/actions";

const AddNewUser = () => {
  const titles = ["name", "username", "email", "city"];
  const data = useSelector(state => state.data);
  const cancelButton = useRef(null);
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = event => {
    setError("");
    const name = event.target.name;
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const addNewUser = event => {
    event.preventDefault();
    const filterUsers = data.some(user => user.name === inputs.name);
    if (filterUsers) {
      setError("User Already Exists");
      return;
    }
    if (inputs.name && inputs.email) {
      dispatch(fetched([...data, inputs]));
      setError("");
      navigate("/table");
    } else {
      setError("Name and Email Field Required");
    }
  };

  return (
    <Wrapper title="form">
      <div className={s.edit + " " + s.addNewUser}>
        <h4 className={s.confirmation}>Add New User</h4>
        <form onSubmit={addNewUser}>
          {titles.map(val => (
            <div key={val}>
              <label htmlFor={val}>{val}: </label>
              <input
                onChange={handleChange}
                id={val}
                name={val}
                type={val === "email" ? val : "text"}
                placeholder={val}
              />
            </div>
          ))}
          {error && <span className={s.error}>{error}</span>}
          <div className={s.btn_group}>
            <button
              className={s.edit}
              ref={cancelButton}
              onClick={() => navigate("/table")}
            >
              CANCEL
            </button>
            <button className={s.edit} onClick={addNewUser}>
              ADD
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default AddNewUser;
