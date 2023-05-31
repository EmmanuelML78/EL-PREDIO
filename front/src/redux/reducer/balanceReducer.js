import { GET_BALANCE, POST_BALANCE } from "../actions/balanceActions";

// Estado Inicial
const initialState = {
  balance: [],
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    case POST_BALANCE:
      return {
        ...state,
        balance: [...state.balance, action.payload],
      };
    default:
      return state;
  }
};

export default balanceReducer;
