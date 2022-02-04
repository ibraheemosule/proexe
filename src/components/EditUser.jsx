import s from "../assets/sass/edit-user.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { fetched, editData } from "../store/actions";
import loader from "../assets/img/loader.gif";

const EditUser = ({ id, setShowModal }) => {
  const titles = ["name", "username", "email", "city"];
  const data = useSelector(state => state.data);
  const fetching = useSelector(state => state.loading);
  const cancelButton = useRef(null);
  const user = data.filter(val => val.name === id);
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => setShowModal(show => !show);

  const handleChange = event => {
    setError("");
    const name = event.target.name;
    if (name === "city") {
      setInputs({ ...inputs, address: { city: event.target.value } });
      return;
    }
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const submitEdits = async event => {
    event.preventDefault();

    await dispatch(editData());

    const newValue = { ...user[0], ...inputs };

    const filterUsers = data.filter(user => user.name !== newValue.name);
    const checkIfUserExists = filterUsers.some(
      val => val.name === newValue.name
    );
    const isNumPresent = /^[A-Za-z\s]*$/;

    if (!isNumPresent.test(newValue.name)) {
      setError("Name Should Not Include Digits");
      return;
    }

    if (checkIfUserExists) {
      setError("User Already Exists");
      return;
    }

    if (newValue.name && newValue.email && newValue.username) {
      dispatch(fetched([...filterUsers, newValue]));
      setError("");
      event.target.innerHtml = "";
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
              defaultValue={
                user.length
                  ? val === "city"
                    ? user[0].address[`${val}`]
                    : user[0][`${val}`]
                  : ""
              }
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
          <button type="submit">{fetching ? "PROCESSING" : "EDIT"}</button>
        </div>
      </form>
      {fetching && <img src={loader} alt="loader" />}
    </div>
  );
};

export default EditUser;
