import instance from "../axiosCfg";

export const GET_ALL_RESERVAS = "GET_ALL_RESERVAS";
export const GET_RESERVAS_BY_USER = "GET_RESERVAS_BY_USER";
export const GET_RESERVAS_BY_CANCHA = "GET_RESERVAS_BY_CANCHA";
export const POST_RESERVA = "POST_RESERVA";
export const DELETE_RESERVA = "DELETE_RESERVA";
export const PUT_RESERVA = "PUT_RESERVA";

export const getAllReservas = () => {
  return async (dispatch) => {
    const response = await instance.get("reserva");
    const reservas = response.data;
    dispatch({
      type: GET_ALL_RESERVAS,
      payload: reservas,
    });
  };
};

export const getReservasByUser = (userId) => {};

export const getReservasByCancha = (canchaId) => {};

export const postReserva = (reservaData) => {
  return async (dispatch) => {
    const responseReserva = await instance.post("reserva", reservaData);
    const reserva = responseReserva.data;
    console.log("reserva:", reserva);
    // const responsePago = await instance.post("reserva/pagos", reserva);
    // const referenceToken = responsePago.data.preferenceId;
    // console.log(referenceToken)
    dispatch({
      type: POST_RESERVA,
      payload: reserva,
    });
    // window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?${referenceToken}`;
  };
};

export const deleteReserva = (reservaId) => {};

export const putReserva = (reservaData) => {};
