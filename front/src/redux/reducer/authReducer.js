import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_USER,
  EDIT_USER,
} from "../actions/authActions";

const initialState = {
  token: null,
  error: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case LOGOUT_USER:
      return initialState;
    // return {
    //   ...state,
    //   user: undefined,
    // };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case EDIT_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export default authReducer;
