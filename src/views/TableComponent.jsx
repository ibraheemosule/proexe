import { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();

  const data = useSelector(state => state.data);
  const fetching = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const deleteUserFunction = id => {
    setModalType(() => "delete");
    setShowModal(showModal => !showModal);
    setId(id);
  };

  const editUserFunction = id => {
    setModalType(() => "edit");
    setShowModal(showModal => !showModal);
    setId(id);
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
      {fetching && !data.length ? (
        <img src={loader} alt="loader" />
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
                <td>{val.address?.city || "Null"}</td>
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
      {!data.length && !fetching && !error ? (
        <h3>List is Empty</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        ""
      )}
      {showModal && (
        <>
          <Modal showModal={showModal}>
            {modalType === "delete" ? (
              <DeleteComponent id={id} setShowModal={setShowModal} />
            ) : (
              <EditUser id={id} setShowModal={setShowModal} />
            )}
          </Modal>
        </>
      )}
    </Wrapper>
  );
};

export default TableComponent;
