import s from "../assets/sass/edit-user.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { fetched, editData } from "../store/actions";
import loader from "../assets/img/loader.gif";

const EditUser = ({ name, setShowModal }) => {
  const titles = ["name", "username", "email", "city"];
  const data = useSelector(state => state.data);
  const fetching = useSelector(state => state.loading);
  const cancelButton = useRef(null);
  const user = data.filter(val => val.name === name);
  const id = data.map(user => user.name).indexOf(name);
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
    let filteredUser = data.filter(user => user.name === newValue.name)[0];
    const names = [...data.map(val => val.name), newValue.name];

    const checkIfUserExists = () => {
      const doesNameExist = names.indexOf(newValue.name) + 1;
      let checkName = true;
      if (doesNameExist > 0)
        checkName =
          names.indexOf(newValue.name) === names.lastIndexOf(newValue.name);
      const verify = names.indexOf(newValue.name) !== id;
      if (!checkName && verify) return true;
    };
    const isNumPresent = /^[A-Za-z\s]*$/;

    if (!isNumPresent.test(newValue.name)) {
      setError("Name Should Not Include Digits");
      return;
    }

    if (checkIfUserExists()) {
      setError("User Already Exists");
      return;
    }

    if (newValue.name && newValue.email && newValue.username) {
      filteredUser = { ...filteredUser, ...newValue };
      filterUsers.splice(id, 0, filteredUser);
      dispatch(fetched([...filterUsers]));
      setError("");
      event.target.innerHtml = "";
      closeModal(event);
    } else {
      setError("Name, Email and Username Required");
    }
  };

  return (
    <div className={s.edit}>
      <h4 className={s.confirmation}>Edit {name} Details</h4>
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
