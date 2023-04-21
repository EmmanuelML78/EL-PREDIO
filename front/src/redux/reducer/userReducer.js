import {
  POST_USER,
  GET_USERS,
  GET_USER_BY_ID,
  PUT_USER,
  DELETE_USER,
} from "../actions/userActions";

const initialState = {
  users: [],
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
      };
    case POST_USER:
      return {
        ...state,
        users: [state.users, action.payload],
      };
    case PUT_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return { ...user, ...action.payload };
          }
          return user;
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;