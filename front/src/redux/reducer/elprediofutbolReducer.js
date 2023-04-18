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
    default:
      return state;
  }
};

export default elprediofutbolReducer;
