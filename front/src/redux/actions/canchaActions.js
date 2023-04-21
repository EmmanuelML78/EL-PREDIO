export const GET_CANCHAS = "GET_CANCHAS";
export const GET_CANCHA_BY_ID = "GET_CANCHA_BY_ID";
export const POST_CANCHA = "POST_CANCHA";
export const DELETE_CANCHA = "DELETE_CANCHA";
export const PUT_CANCHA = "PUT_CANCHA";
import axios from "axios";

export const getCanchas = () => {
  return async (dispatch) => {
    try {
      console.log("enviando peticion...")
      const res = await axios.get(`http://localhost:3001/canchas`);
      console.log("data: ", res.data)
      if (res.status === 200) {
        dispatch({
          type: GET_CANCHAS,
          payload: res.data,
        });
      } else {
        console.error("Error al obtener las canchas");
      }
    } catch (error) {
      console.error("Error al obtener las canchas", error);
    }
  };
};

export const getCanchaById = (canchaId) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/canchas/${canchaId}`);
    const data = res.data;
    console.log("action data", data);
    dispatch({
      type: GET_CANCHAS,
      payload: data,
    });
  };
};

export const postCancha = (canchaData) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:3001/canchas", canchaData);
    const data = res.data;

    dispatch({
      type: POST_CANCHA,
      payload: data,
    });
  };
};

export const deleteCancha = (canchaId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/canchas/${canchaId}`
      );

      if (res.status === 200) {
        dispatch({
          type: DELETE_CANCHA,
          payload: canchaId,
        });
      }
    } catch (error) {
      console.error("Error al eliminar la Reserva", error);
    }
  };
};

export const putCancha = (canchaData) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3001/canchas`, canchaData);

      if (res.status === 200) {
        dispatch({
          type: PUT_CANCHA,
          payload: res.data,
        });
      } else {
        console.error("Error al actualizar la cancha");
      }
    } catch (error) {
      console.error("Error al actualizar la cancha", error);
    }
  };
};
