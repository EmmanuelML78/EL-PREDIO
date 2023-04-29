import instance from "../axiosCfg";

export const GET_REVIEWS = "GET_REVIEWS";
export const POST_REVIEW = "POST_REVIEW";
export const PUT_REVIEW = "PUT_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";

export const getReviews = () => async (dispatch) => {
  const res = await instance.get("/reviews");

  dispatch({
    type: GET_REVIEWS,
    payload: res.data,
  });
};

export const postReviews = (data) => async (dispatch) => {
  const res = await instance.post("/reviews", data);
  console.log("action", res.data);
  dispatch({
    type: POST_REVIEW,
    payload: res.data,
  });
};
