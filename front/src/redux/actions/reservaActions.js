import instance from "../axiosCfg";

export const GET_RESERVAS_BY_USER = "GET_RESERVAS_BY_USER";
export const GET_RESERVAS_BY_CANCHA = "GET_RESERVAS_BY_CANCHA";
export const POST_RESERVA = "POST_RESERVA";
export const DELETE_RESERVA = "DELETE_RESERVA";
export const PUT_RESERVA = "PUT_RESERVA";


export const getReservasByUser = (userId) => {};

export const getReservasByCancha = (canchaId) => {};

export const postReserva = (reservaData) => {
  return async (dispatch) => {
    const res = await instance.post("reserva", reservaData);
    const data = res.data;
    dispatch({
      type: POST_RESERVA,
      payload: data,
    });
  };
};

export const deleteReserva = (reservaId) => {};

export const putReserva = (reservaData) => {};
