import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser, putUser } from "../../redux/actions/userActions";
import "./UsersTable.css";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UsersTable = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [filterState, setFilterState] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getUsers());
      setIsLoading(false);
    };
    fetchUsers();
  }, [dispatch]);

  const handleEliminarUsuario = (id) => {
    confirmAlert({
      title: "Eliminar usuario",
      message: "¿Está seguro que desea eliminar el usuario?",
      buttons: [
        {
          label: "Eliminar",
          onClick: async () => {
            await dispatch(deleteUser(id));
          },
        },
        {
          label: "Cancelar",
          onClick: () => {},
        },
      ],
    });
  };

  const filteredUsers = !isLoading
    ? users.filter((user) => {
        if (filterState === "activo") {
          return !user.deletedAt;
        } else if (filterState === "inactivo") {
          return user.deletedAt;
        } else {
          return true;
        }
      })
    : [];

  var sortedUsers = filteredUsers;
  if (sortBy === "asc") {
    sortedUsers = filteredUsers.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
  } else if (sortBy === "des") {
    sortedUsers = filteredUsers.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  }
  function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  var filteredNameUsers = sortedUsers.filter((user) =>
    normalize(
      user.name.toLowerCase() + " " + user.lastName.toLowerCase()
    ).includes(normalize(nameFilter.toLowerCase()))
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        users && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                placeItems: "center",
                color: "white",
                fontWeight: "500",
                backgroundColor: "#3a3a3a",
              }}
            >
              <h4
                style={{
                  padding: "0.5rem 2rem 0.5rem 2rem",
                  borderLeft: "10px solid #2a2a2a"
                }}
              >
                Filtros
              </h4>
              <label style={{ margin: "0.5rem 0.5rem 0.5rem 2rem" }}>
                Apellido:
              </label>
              <input
                type="text"
                style={{
                  border: "1px solid grey",
                  maxHeight: "3rem",
                  paddingLeft: "1rem",
                  maxWidth: "15rem",
                  backgroundColor: "#2a2a2a",
                }}
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />

              <label style={{ margin: "0.5rem 0.5rem 0.5rem 2rem" }}>
                Ordernar por fecha:
              </label>
              <select
                name="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.5rem 0 0.5rem 0.5rem",
                  backgroundColor: "#2a2a2a",
                }}
              >
                <option value="asc">Ascendente</option>
                <option value="des">Descendente</option>
              </select>
              <label style={{ margin: "0.5rem 0.5rem 0.5rem 2rem" }}>
                Estado:
              </label>
              <select
                name="estado"
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                style={{
                  padding: "0.5rem 0 0.5rem 0.5rem",
                  backgroundColor: "#2a2a2a",
                }}
              >
                <option value="all">Todos</option>
                <option value="activo">Activos</option>
                <option value="inactivo">Inactivos</option>
              </select>
            </div>
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
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNameUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "Administrador" : "Usuario"}</td>
                      <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{user.deletedAt ? "Inactivo" : "Activo"}</td>
                      <td>
                        <button
                          onClick={() => handleEliminarUsuario(user.id)}
                          style={{ background: "transparent" }}
                        >
                          <MdDeleteOutline />
                        </button>
                        <button style={{ background: "#transparent" }}>
                          <AiFillEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link>
                <button style={{ background: "transparent" }}>
                  Crear usuario
                </button>
              </Link>
            </div>
          </>
        )
      )}
    </>
  );
};

export default UsersTable;
