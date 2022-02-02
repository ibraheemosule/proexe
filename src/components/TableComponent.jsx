import { useState, createRef } from "react";
import s from "../assets/sass/table.module.scss";
import Wrapper from "./Wrapper";
import Modal from "./Modal";
import DeleteComponent from "./DeleteComponent";
import EditUser from "./EditUser";
import { useSelector } from "react-redux";

const TableComponent = () => {
  const titles = ["id", "name", "username", "email", "city", "edit", "delete"];
  const [id, setId] = useState(null);
  const deleteModal = createRef();
  const editModal = createRef();

  const data = useSelector(state => state.data);

  const deleteUserFunction = id => {
    setId(id);
    deleteModal.current.style.display = "flex";
  };

  const editUserFunction = id => {
    setId(id);
    editModal.current.style.display = "flex";
  };

  return (
    <Wrapper title="list user">
      <table>
        <thead>
          <tr className={s.head}>
            {titles.map(title => (
              <td key={title}>{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((val, i) => (
            <tr key={i + Math.random() * 1000}>
              <td>{i + 1}</td>
              <td>{val.name}</td>
              <td>{val.username || "Null"}</td>
              <td>{val.email}</td>
              <td>{val.city || "Null"}</td>
              <td>
                <button
                  className={s.edit}
                  onClick={() => editUserFunction(val.name)}
                >
                  {" "}
                  Edit
                </button>
              </td>
              <td>
                <button
                  className={s.delete}
                  onClick={() => deleteUserFunction(val.name)}
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length && <h3>List is Empty</h3>}
      <Modal ref={deleteModal}>
        <DeleteComponent id={id} />
      </Modal>
      <Modal ref={editModal}>
        <EditUser id={id} />
      </Modal>
    </Wrapper>
  );
};

export default TableComponent;
