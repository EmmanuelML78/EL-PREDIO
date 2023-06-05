import authReducer from "./authReducer";
import canchasReducer from "./canchasReducer";
import reservasReducer from "./reservasReducer";
import userReducer from "./userReducer";
import reviewsReducer from "./reviewsReducer";
import { combineReducers } from "redux";
import balanceReducer from './balanceReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    canchas: canchasReducer,
    reservas: reservasReducer,
    user: userReducer,
    reviews: reviewsReducer,
    balance: balanceReducer,
})

export default rootReducer;