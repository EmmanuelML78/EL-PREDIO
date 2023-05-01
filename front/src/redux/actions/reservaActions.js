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

export const postReserva = (reservaData, callback) => {
  return async (dispatch) => {
    try {
      const responseReserva = await instance.post("reserva", reservaData, {
        withCredentials: true,
      });
      const reservaId = responseReserva.data.id;
      const id = {
        id: reservaId,
      };
      const responsePago = await instance.post("reserva/pagos", id);
      // console.log(responsePago);
      window.location.href = responsePago.data.body.init_point;

      // Esperar la respuesta de MercadoPago
      const mercadoPagoResponse = await waitForMercadoPagoResponse(
        responsePago.data.body.id
      );

      // Actualizar la reserva en la base de datos con el estado de la transacción
      const reservaActualizada = await actualizarReserva(
        reservaId,
        mercadoPagoResponse
      );

      // Ejecutar el callback con la reserva actualizada
      callback(reservaActualizada);
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteReserva = (reservaId) => {
  return async (dispatch) => {
    await instance.delete(`reserva/${reservaId}`, { withCredentials: true });
    dispatch({
      type: DELETE_RESERVA,
      payload: reservaId,
    });
  };
};

// Esperar la respuesta de MercadoPago
async function waitForMercadoPagoResponse(preferenceId) {
  let response;
  do {
    response = await instance.get(`reserva/pagos/${preferenceId}`, {
      withCredentials: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } while (response.data.body.status === "in_process");
  return response.data;
}

// Actualizar la reserva en la base de datos con el estado de la transacción
async function actualizarReserva(reservaId, mercadoPagoResponse) {
  const estado = mercadoPagoResponse.body.status;
  const response = await instance.put(`reserva/${reservaId}`, { estado });
  return response.data;
}

export const putReserva = (reservaData) => {};
