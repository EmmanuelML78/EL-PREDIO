import instance from "../axiosCfg";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER = "SET_USER";


export const loginUser = (userData) => {
    return async function (dispatch) {
      const response = await instance.post("login", userData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN_USER,
        payload: response.data,
      });
      return response;
    };
  }