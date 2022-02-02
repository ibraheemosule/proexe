import s from "../assets/sass/modal.module.scss";
import { forwardRef } from "react";

const Modal = forwardRef(({ children }, ref) => {
  return (
    <div ref={ref} className={s.modal}>
      {children}
    </div>
  );
});

export default Modal;
