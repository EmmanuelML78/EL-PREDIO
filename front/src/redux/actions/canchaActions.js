export const GET_CANCHAS = "GET_CANCHAS";
export const GET_CANCHA_BY_ID = "GET_CANCHA_BY_ID";
export const POST_CANCHA = "POST_CANCHA";
export const DELETE_CANCHA = "DELETE_CANCHA";
export const PUT_CANCHA = "PUT_CANCHA";
import instance from "../axiosCfg";

export const getCanchas = () => {
  return async (dispatch) => {
    try {

      const res = await instance.get("canchas");
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
    const res = await instance.get(`canchas/${canchaId}`);
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
    const res = await instance.post("canchas", canchaData);
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
      const res = await instance.delete(`canchas/${canchaId}`);

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
      const res = await instance.put(`/canchas`, canchaData);
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: PUT_CANCHA,
          payload: res.data.data,
        });
      } else {
        console.error("Error al actualizar la cancha");
      }
    } catch (error) {
      console.error("Error al actualizar la cancha", error);
    }
  };
};
