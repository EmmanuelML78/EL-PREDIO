import axios from "axios";

export const GET_USERS = "GET_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER";
export const DELETE_USER = "DELETE_USER";

export const getUsers = () => {};

export const getUserById = (userId) => {};

export const postUser = (userData) => {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/users", userData);
    dispatch({
      type: POST_USER,
      payload: response.data,
    });
    return response;
  };
};

export const putUser = (userId, userData) => {};

export const deleteUser = (userId) => {};
