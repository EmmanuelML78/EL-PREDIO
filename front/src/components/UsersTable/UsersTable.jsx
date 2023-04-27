import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/userActions";
import "./UsersTable.css";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UsersTable = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getUsers());
      setIsLoading(false);
    };
    fetchUsers();
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Fecha de registro</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Administrador" : "Usuario"}</td>
                  <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
                  <td>
                    <button style={{ backgroundColor: "#00000000" }}>
                      <MdDeleteOutline />
                    </button>
                    <button style={{ backgroundColor: "#00000000" }}>
                      <AiFillEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link>
            <button style={{background: "transparent"}}>Crear usuario</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UsersTable;
