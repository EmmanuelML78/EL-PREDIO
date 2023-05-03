import instance from "../axiosCfg";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_GOOGLE = "LOGOUT_GOOGLE";
export const SET_USER = "SET_USER";
export const EDIT_USER = "EDIT_USER";

export const loginUser = (userData) => {
  return async function (dispatch) {
    const response = await instance.post("login", userData);
    const token = response.data.token;
    localStorage.setItem("token", token);
    dispatch({
      type: LOGIN_USER,
      payload: token,
    });
    return response;
  };
};

export const logoutUser = () => {
  console.log("ejecuta action");
  return async function (dispatch) {
    try {
      console.log("entra al try");
      if (localStorage.getItem("token")) {
        console.log("hay token");
        localStorage.removeItem("token");
      } else {
        console.log("hay token");
        const res = await instance.get("logout");
        console.log(res);
      }
      dispatch({
        type: LOGOUT_USER,
        payload: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// export const setUser = () => {
//   return async function (dispatch) {
//     try {
//       const response = await instance.get("me", { withCredentials: true });
//       dispatch({
//         type: SET_USER,
//         payload: response.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: SET_USER,
//         payload: undefined,
//       });
//     }
//   };
// };
export const setUser = () => {
  return async function (dispatch) {
    try {
      console.log("llamando a ruta /me");
      const response = await instance.get("me", { withCredentials: true });
      dispatch({
        type: SET_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: SET_USER,
        payload: undefined,
      });
    }
  };
};

export const editUser = (userData) => {
  return async function (dispatch) {
    try {
      await instance.put("/me", userData);
      dispatch({
        type: EDIT_USER,
        payload: userData,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
