import authReducer from "./authReducer";
import canchasReducer from "./canchasReducer";
import reservasReducer from "./reservasReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    auth: authReducer,
    canchas: canchasReducer,
    reservas: reservasReducer,
    user: userReducer
})

export default rootReducer;