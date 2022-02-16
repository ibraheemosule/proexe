import Wrapper from "../components/Wrapper";
import s from "../assets/sass/add-new-user.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { fetched, editData } from "../store/actions";
import loader from "../assets/img/loader.gif";

const AddNewUser = () => {
  const titles = ["name", "username", "email", "city"];
  const data = useSelector(state => state.data);
  const fetching = useSelector(state => state.loading);
  const cancelButton = useRef(null);

  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = event => {
    setError("");
    const name = event.target.name;

    let maxId = data.reduce(
      (prev, next) => (prev.id > next.id ? prev.id : next.id),
      { id: 0 }
    );
    if (name === "city") {
      setInputs({
        ...inputs,
        id: ++maxId,
        address: { city: event.target.value },
      });
      return;
    }
    setInputs({ ...inputs, id: ++maxId, [name]: event.target.value });
  };

  const addNewUser = async event => {
    event.preventDefault();
    window.removeEventListener("keypress", enterKeyPress);
    await dispatch(editData());

    const filterUsers = data.some(user => user.name === inputs.name);
    const isNumPresent = /^[A-Za-z\s]*$/;

    if (!isNumPresent.test(inputs.name)) {
      setError("Name Should Not Include Digits");
      return;
    }

    if (filterUsers) {
      setError("User Already Exists");
      return;
    }

    if (inputs.name && inputs.email && inputs.username) {
      dispatch(fetched([...data, inputs]));
      setError("");
      navigate("/table");
    } else {
      setError("Name, Email and Username Required");
    }
  };

  const enterKeyPress = e => (e.key === "Enter" ? e.preventDefault() : "");
  window.addEventListener("keypress", enterKeyPress);

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
            <button ref={cancelButton} onClick={() => navigate("/table")}>
              CANCEL
            </button>
            <button onClick={addNewUser}>
              {" "}
              {fetching ? "PROCESSING" : "ADD"}
            </button>
          </div>
        </form>
      </div>
      {fetching && <img src={loader} alt="loader" />}
    </Wrapper>
  );
};

export default AddNewUser;
