import s from "../assets/sass/modal.module.scss";
import { forwardRef } from "react";

const Modal = forwardRef(({ children, showModal }, ref) => {
  return (
    <div
      ref={ref}
      className={s.modal}
      style={{ display: showModal ? "flex" : "none" }}
    >
      {children}
    </div>
  );
});

export default Modal;
