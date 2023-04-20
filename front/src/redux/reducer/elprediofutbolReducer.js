// Importar Primero Los Tipos De acciones
import {
  GET_CANCHAS,
  GET_CANCHA_BY_ID,
  POST_CANCHA,
  DELETE_CANCHA,
  PUT_CANCHA,
} from "../actions/canchaActions";
// Estado Inicial
const initialState = {
  canchas: [],
  allCanchas: [],
  cancha: [],
};

const elprediofutbolReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_USER":
      return action.payload;
    case GET_CANCHAS:
      return {
        ...state,
        canchas: action.payload,
      };
    case GET_CANCHA_BY_ID:
      return {
        ...state,
        cancha: action.payload,
      };
    case POST_CANCHA:
      return {
        ...state,
        canchas: [...state.canchas, action.payload],
      };
    case DELETE_CANCHA:
      return {
        ...state,
        canchas: state.canchas.filter((cancha) => cancha.id !== action.payload),
      };
    case PUT_CANCHA:
      return {
        ...state,
        canchas: state.canchas.map((cancha) => {
          if (cancha.id === action.payload.id) {
            return { ...cancha, ...action.payload };
          }
          return cancha;
        }),
      };
    default:
      return state;
  }
};

export default elprediofutbolReducer;
