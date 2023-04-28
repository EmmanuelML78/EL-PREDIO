import instance from "../axiosCfg";

export const GET_USERS = "GET_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER";
export const DELETE_USER = "DELETE_USER";

export const getUsers = () => {
  return async function (dispatch) {
    const response = await instance.get("users", { withCredentials: true });
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });
    return response;
  };
};

export const getUserById = (userId) => {};

export const postUser = (userData) => {
  return async function (dispatch) {
    const response = await instance.post("users", userData, { withCredentials: true });
    dispatch({
      type: POST_USER,
      payload: response.data,
    });
    return response;
  };
};

export const putUser = (userId, userData) => {};

export const deleteUser = (userId) => {};
