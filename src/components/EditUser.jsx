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
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const submitEdits = event => {
    event.preventDefault();
    const filterUsers = data.filter(user => user.name !== id);
    const checkIfUserExists = filterUsers.some(val => val.name === inputs.name);
    if (checkIfUserExists) {
      setError("User Already Exists");
      return;
    }
    if (inputs.name && inputs.email) {
      dispatch(fetched([...filterUsers, inputs]));
      setError("");
      closeModal(event);
    } else {
      setError("Name and Email Field Required");
    }
  };

  return (
    <div className={s.edit}>
      <h4 className={s.confirmation}>Confirm Edit</h4>
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
          <button className={s.edit} ref={cancelButton} onClick={closeModal}>
            CANCEL
          </button>
          <button className={s.edit} onClick={submitEdits}>
            EDIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
