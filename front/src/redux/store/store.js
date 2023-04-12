import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import elprediofutbolReducer from "../reducer/elprediofutbolReducer";

const store = createStore(
	elprediofutbolReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
