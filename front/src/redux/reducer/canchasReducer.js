
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
  cancha: {},
};

const canchasReducer = (state = initialState, action) => {
  switch (action.type) {
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
        
        const updatedCanchas = state.canchas.map((cancha) => {
          if (cancha.id === action.payload.id) {
            return { ...cancha, ...action.payload };
          }
          return cancha;
        });
        
        console.log("Antes:", state.canchas);
        console.log("Después:", updatedCanchas);
      
        return {
          ...state,
          canchas: updatedCanchas,
      };
    default:
      return state;
  }
};

export default canchasReducer;
