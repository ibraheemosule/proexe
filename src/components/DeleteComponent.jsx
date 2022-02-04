import s from "../assets/sass/delete.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../store/actions";
import { useRef } from "react";

const DeleteComponent = ({ id, setShowModal }) => {
  const data = useSelector(state => state.data);
  const cancelButton = useRef(null);
  const dispatch = useDispatch();

  const closeModal = () => setShowModal(showModal => !showModal);

  const handleDelete = () => {
    dispatch(deleteUser(data, id));
    closeModal();
  };

  return (
    <div className={s.delete}>
      <h4 className={s.confirmation}>Confirm Delete</h4>
      <div>
        <button className={s.edit} ref={cancelButton} onClick={closeModal}>
          {" "}
          CANCEL
        </button>
        <button className={s.edit} onClick={handleDelete}>
          {" "}
          DELETE
        </button>
      </div>
    </div>
  );
};

export default DeleteComponent;
