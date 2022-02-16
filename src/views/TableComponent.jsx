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
import * as _ from "../functions/index.js";

const TableComponent = () => {
  const titles = ["id", "name", "username", "email", "city", "edit", "delete"];
  const [name, setName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();

  const data = useSelector(state => state.data);
  const fetching = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const deleteUserFunction = name => {
    setModalType(() => "delete");
    setShowModal(showModal => !showModal);
    setName(name);
  };

  const editUserFunction = name => {
    setModalType(() => "edit");
    setShowModal(showModal => !showModal);
    setName(name);
  };

  const callAscend =
    (list = data) =>
    val =>
      dispatch(fetched(_.sortAscending(data, val)));

  const callDescend =
    (list = data) =>
    val =>
      dispatch(fetched(_.sortDescending(data, val)));

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
                  <div className={s.head_wrapper}>
                    <span>{title}</span>
                    {title !== "edit" && title !== "delete" && (
                      <div className={s.icons}>
                        <button
                          className={s.up}
                          onClick={() => callAscend()(title)}
                        ></button>
                        <button
                          className={s.down}
                          onClick={() => callDescend()(title)}
                        ></button>
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((val, i) => (
              <tr key={i + Math.random() * 10000}>
                <td>{val.id}</td>
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
      ) : error && !data.length ? (
        <h3>{error}</h3>
      ) : (
        ""
      )}
      {showModal && (
        <>
          <Modal showModal={showModal}>
            {modalType === "delete" ? (
              <DeleteComponent name={name} setShowModal={setShowModal} />
            ) : (
              <EditUser name={name} setShowModal={setShowModal} />
            )}
          </Modal>
        </>
      )}
    </Wrapper>
  );
};

export default TableComponent;
