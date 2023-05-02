import instance from "../axiosCfg";

export const GET_ALL_RESERVAS = "GET_ALL_RESERVAS";
export const POST_RESERVA = "POST_RESERVA";
export const DELETE_RESERVA = "DELETE_RESERVA";
export const PUT_RESERVA = "PUT_RESERVA";
export const GET_RESERVA_BY_ID = "GET_RESERVA_BY_ID";

export const getReservaById = (reservaId) => {
  return async (dispatch) => {
    const res = await instance.get(`reserva/${reservaId}`, {
      withCredentials: true,
    });
    const data = res.data;
    console.log("action data", data);
    dispatch({
      type: GET_RESERVA_BY_ID,
      payload: data,
    });
  };
};

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

// export const postReserva = (reservaData) => {
//   return async (dispatch) => {
//     const responseReserva = await instance.post("reserva", reservaData, { withCredentials: true });
//     const reservaId = responseReserva.data.id; //trae el id del reserva de la respiesta generada del back
//     console.log(reservaId);
//     const id = {
//       id: reservaId
//     }
//     const responsePago = await instance.post("reserva/pagos", id); //ruta post para pagos con los datos que se envian a mercado pago
//     dispatch({
//       type: POST_RESERVA,
//       payload: responseReserva,
//     });
//     window.location.href = responsePago.data.body.init_point; //redirecicionamiento a la url de mercadopago usar init_pooint no tratar de usar el pref_id solo

//     // Esperar unos segundos y consultar periódicamente el estado de la reserva
//    const intervalId = setInterval(async () => {
//     const responseReserva = await instance.get(`reserva/${reservaId}`);
//     const reserva = responseReserva.data;
//     if (reserva.estado !== "pendiente") {
//       clearInterval(intervalId);
//       // Actualizar la vista con el resultado de la transacción
//       if (reserva.estado === "aprobado") {
//         // ...
//       } else {
//         // ...
//       }
//     }
//   }, 5000);
//   };
// };
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
  console.log(response.data);
}

export const putReserva = (reservaData) => {
  return async (dispatch) => {
    console.log("reservaData:", reservaData);
    try {

      const response = await instance.put(`reserva`, reservaData, {

        withCredentials: true,
      });
      console.log("response put: ", response.data);
      dispatch({
        type: PUT_RESERVA,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al actualizar la reserva", error);
    }
  };
};
