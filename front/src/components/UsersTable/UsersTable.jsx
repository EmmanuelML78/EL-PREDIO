import React, { useState, useEffect } from "react";
// import { getUsers } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/userActions";
import "./UsersTable.css"


const UsersTable = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true)
    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        const fetchUsers = async () => {
          await dispatch(getUsers());
          setIsLoading(false);
        };
        fetchUsers();
      }, [dispatch]);

    return (
        <table className="tabla">
            <thead className="head-tabla">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody className="body-tabla">
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="celda">{user.id}</td>
                        <td className="celda">{user.name}</td>
                        <td className="celda">{user.lastName}</td>
                        <td className="celda">{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UsersTable;