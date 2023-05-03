import {
  GET_ALL_RESERVAS,
  POST_RESERVA,
  DELETE_RESERVA,
  PUT_RESERVA,
} from "../actions/reservaActions.js";

const initialState = {
  reservas: [],
};

// Define el reducer
const reservasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RESERVAS:
      return {
       ...state,
        reservas: action.payload,
      };
    case POST_RESERVA:
      return {
        ...state,
        reservas: [...state.reservas, action.payload],
      };
    case DELETE_RESERVA:
      return {
        ...state,
        reservas: state.reservas.filter(
          (reserva) => reserva.id !== action.payload
        ),
      };
    case PUT_RESERVA:
      return {
        ...state,
        reservas: state.reservas.map((reserva) =>
          reserva.id === action.payload.id ? action.payload : reserva
        ),
      };
    default:
      return state;
  }
};

// Exporta el reducer
export default reservasReducer;
