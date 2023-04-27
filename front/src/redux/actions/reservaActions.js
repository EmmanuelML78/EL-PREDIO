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
    const reservaId = responseReserva.data.id; //trae el id del reserva de la respiesta generada del back
    const reservaFull = await instance.get(`reserva/${reservaId}`); //trae los datos de la reserva que se generan del back por el id
    const datos = {
      //datos del objeto que van para mercadopago
      id: reservaFull.data.id,
      title: "reserva cancha",
      price: reservaFull.data.cancha.price,
      identificador: reservaFull.data.id + reservaFull.data.createdAt,
      image: reservaFull.data.cancha.image,
    };
    const responsePago = await instance.post("reserva/pagos", datos); //ruta post para pagos con los datos que se envian a mercado pago
    dispatch({
      type: POST_RESERVA,
      payload: reservaFull,
    });
    window.location.href = responsePago.data.body.init_point; //redirecicionamiento a la url de mercadopago usar init_pooint no tratar de usar el pref_id solo
  };
};

export const deleteReserva = (reservaId) => {};

export const putReserva = (reservaData) => {};
