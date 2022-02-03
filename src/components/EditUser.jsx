import s from "../assets/sass/edit-user.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { fetched } from "../store/actions";

const EditUser = ({ id }) => {
  const titles = ["name", "username", "email", "city"];
  const data = useSelector(state => state.data);
  const cancelButton = useRef(null);
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const closeModal = e => {
    e.preventDefault();
    const modalNode =
      cancelButton.current.parentNode.parentNode.parentNode.parentNode;
    modalNode.style.display = "none";
  };

  const handleChange = event => {
    setError("");
    const name = event.target.name;
    if (name === "city") {
      setInputs({ ...inputs, address: { city: event.target.value } });
      return;
    }
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const submitEdits = event => {
    event.preventDefault();
    const filterUsers = data.filter(user => user.name !== id);
    const checkIfUserExists = filterUsers.some(val => val.name === inputs.name);
    const isNumPresent = /^[A-Za-z\s]*$/;

    if (!isNumPresent.test(inputs.name)) {
      setError("Name Should Not Include Digits");
      return;
    }

    if (checkIfUserExists) {
      setError("User Already Exists");
      return;
    }
    if (dispatch(!isNumPresent(inputs.name))) {
      setError("Name should not have digits");
      return;
    }
    if (inputs.name && inputs.email && inputs.username) {
      dispatch(fetched([...filterUsers, inputs]));
      setError("");
      closeModal(event);
    } else {
      setError("Name, Email and Username Required");
    }
  };

  return (
    <div className={s.edit}>
      <h4 className={s.confirmation}>Edit {id} Details</h4>
      <form onSubmit={submitEdits}>
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
          <button ref={cancelButton} onClick={closeModal}>
            CANCEL
          </button>
          <button onClick={submitEdits}>EDIT</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
