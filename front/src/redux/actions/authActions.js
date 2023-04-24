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
};

export const logoutUser = () => {
  return async function (dispatch) {
    localStorage.removeItem("token");
    dispatch({
      type: LOGOUT_USER,
    });
  };
};

export const setUser = () => {
  return async function (dispatch) {
    try {
      const response = await instance.get("me");
      console.log("data me:", response.data);
      dispatch({
        type: SET_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log("setUser error:", error);
      dispatch({
        type: SET_USER,
        payload: {
          error: error.response.status
        },
      });
    }
  };
};
