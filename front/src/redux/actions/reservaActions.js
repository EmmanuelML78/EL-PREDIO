import instance from "../axiosCfg";

export const GET_ALL_RESERVAS = "GET_ALL_RESERVAS";
export const POST_RESERVA = "POST_RESERVA";
export const DELETE_RESERVA = "DELETE_RESERVA";
export const PUT_RESERVA = "PUT_RESERVA";

export const getAllReservas = () => {
  return async (dispatch) => {
    const response = await instance.get("reserva", { withCredentials: true });
    const reservas = response.data;
    dispatch({
      type: GET_ALL_RESERVAS,
      payload: reservas,
    });
  };
};


export const postReserva = (reservaData) => {
  return async (dispatch) => {
    const responseReserva = await instance.post("reserva", reservaData, { withCredentials: true });
    const reservaId = responseReserva.data.id; //trae el id del reserva de la respiesta generada del back
    console.log(reservaId);
    const id = {
      id: reservaId
    }
    const responsePago = await instance.post("reserva/pagos", id); //ruta post para pagos con los datos que se envian a mercado pago
    dispatch({
      type: POST_RESERVA,
      payload: responseReserva,
    });
    window.location.href = responsePago.data.body.init_point; //redirecicionamiento a la url de mercadopago usar init_pooint no tratar de usar el pref_id solo
  };
};

export const deleteReserva = (reservaId) => {};

export const putReserva = (reservaData) => {};
