import s from "../assets/sass/delete.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../store/actions";
import { useRef } from "react";

const DeleteComponent = ({ id }) => {
  const data = useSelector(state => state.data);
  const cancelButton = useRef(null);

  const closeModal = () => {
    const modalNode = cancelButton.current.parentNode.parentNode.parentNode;
    modalNode.style.display = "none";
    modalNode.parentNode.style.overflow = "scroll";
  };

  const dispatch = useDispatch();

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
