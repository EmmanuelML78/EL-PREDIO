import { GET_REVIEWS, POST_REVIEW } from "../actions/reviewsActions";

const initialState = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case POST_REVIEW:
      console.log(action.payload)
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      }
    default:
      return state;
  }
};

export default reviewsReducer;
