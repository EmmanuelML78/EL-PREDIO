import instance from "../axiosCfg";
export const GET_BALANCE = "GET_BALANCE";
export const POST_BALANCE = "POST_BALANCE";

export const getBalance = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("balances", { withCredentials: true });
      if (res.status === 200) {
        dispatch({
          type: GET_BALANCE,
          payload: res.data,
        });
      } else {
        console.error("Error al obtener los balances");
      }
    } catch (error) {
      console.error("Error al obtener las canchas", error);
    }
  };
};

export const postBalance = (balanceData) => {
  return async (dispatch) => {
    const res = await instance.post("balance", balanceData, {
      withCredentials: true,
    });
    const data = res.data;

    dispatch({
      type: POST_BALANCE,
      payload: data,
    });
  };
};
