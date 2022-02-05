import s from "../assets/sass/delete.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, editData, errorMessage } from "../store/actions";
import { useRef } from "react";
import loader from "../assets/img/loader.gif";

const DeleteComponent = ({ name, setShowModal }) => {
  const data = useSelector(state => state.data);
  const fetching = useSelector(state => state.loading);
  const cancelButton = useRef(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(errorMessage(""));
    setShowModal(showModal => !showModal);
  };

  const handleDelete = async () => {
    await dispatch(editData());
    dispatch(deleteUser(data, name));
    closeModal();
  };

  return (
    <div className={s.delete}>
      <h4 className={s.confirmation}>Confirm Delete</h4>
      <div>
        <button
          disabled={fetching ? true : false}
          className={s.edit}
          ref={cancelButton}
          onClick={closeModal}
        >
          {" "}
          CANCEL
        </button>
        <button className={s.edit} onClick={handleDelete}>
          {" "}
          DELETE
        </button>
      </div>
      {fetching && <img src={loader} alt="loader" />}
    </div>
  );
};

export default DeleteComponent;
