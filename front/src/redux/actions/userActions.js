import instance from "../axiosCfg";

export const GET_USERS = "GET_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER";
export const DELETE_USER = "DELETE_USER";

export const getUsers = () => {
  return async function (dispatch) {
    const activos = await instance.get("users", { withCredentials: true });
    const inactivos = await instance.get("users/inactivos", {
      withCredentials: true,
    });
    const allUsers = activos.data.concat(inactivos.data);
    console.log("users:", allUsers);
    dispatch({
      type: GET_USERS,
      payload: allUsers,
    });
    return allUsers;
  };
};

export const getUserById = (userId) => {
  return async function (dispatch) {
    const response = await instance.get(`users/${userId}`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_USER_BY_ID,
      payload: response.data,
    });
    return response;
  };
};

export const postUser = (userData) => {
  return async function (dispatch) {
    const response = await instance.post("users", userData);
    dispatch({
      type: POST_USER,
      payload: response.data,
    });
    return response;
  };
};

export const putUser = (userId, userData) => {
  return async function (dispatch) {
    const response = await instance.put(`users/${userId}`, userData);
    dispatch({
      type: PUT_USER,
      payload: response.data,
    });
    return response;
  };
};

export const deleteUser = (userId) => {
  return async function (dispatch) {
    const response = await instance.delete(`users/${userId}`);
    dispatch({
      type: DELETE_USER,
      payload: response.data,
    });
    return response;
  };
};
