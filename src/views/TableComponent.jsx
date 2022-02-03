import { useState, createRef } from "react";
import s from "../assets/sass/table.module.scss";
import Wrapper from "../components/Wrapper";
import Modal from "../components/Modal";
import DeleteComponent from "../components/DeleteComponent";
import { useDispatch } from "react-redux";
import EditUser from "../components/EditUser";
import { useSelector } from "react-redux";
import { fetched } from "../store/actions";
import loader from "../assets/img/loader.gif";

const TableComponent = () => {
  const titles = ["id", "name", "username", "email", "city", "edit", "delete"];
  const [id, setId] = useState(null);
  const deleteModal = createRef();
  const editModal = createRef();
  const dispatch = useDispatch();

  const data = useSelector(state => state.data);
  const fetching = useSelector(state => state.loading);

  const deleteUserFunction = id => {
    setId(id);
    deleteModal.current.style.display = "flex";
  };

  const editUserFunction = id => {
    setId(id);
    editModal.current.style.display = "flex";
  };

  const sortInAscending = () => {
    const sortData = [...data].sort((a, b) =>
      b.username.toLowerCase() < a.username.toLowerCase() ? 1 : -1
    );
    dispatch(fetched(sortData));
  };

  const sortInDescending = () => {
    const sortData = [...data].sort((a, b) =>
      b.username.toLowerCase() > a.username.toLowerCase() ? 1 : -1
    );
    dispatch(fetched(sortData));
  };

  return (
    <Wrapper title="list user">
      {fetching ? (
        <img src={loader} />
      ) : (
        <table>
          <thead>
            <tr className={s.head}>
              {titles.map(title => (
                <td key={title}>
                  {title}
                  {title === "username" && (
                    <div className={s.icons}>
                      <button
                        className={s.up}
                        onClick={sortInAscending}
                      ></button>
                      <button
                        className={s.down}
                        onClick={sortInDescending}
                      ></button>
                    </div>
                  )}{" "}
                </td>
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
                <td>{val.address.city || "Null"}</td>
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
      )}
      {!data.length && !fetching && <h3>List is Empty</h3>}
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
