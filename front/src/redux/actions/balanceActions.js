export const GET_BALANCE = "GET_BALANCE";
export const POST_BALANCE = "POST_BALANCE";
import instance from "../axiosCfg";
import moment from "moment";

export const getBalance = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("balance", { withCredentials: true });
      console.log(res.data);
      const formattedBalance = res.data.map((b) => {
        b.createdAt = moment(b.createdAt).format("DD/MM/YYYY");
        return b;
      });
      console.log("res", res.data);
      if (res.status === 200) {
        dispatch({
          type: GET_BALANCE,
          payload: formattedBalance,
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
