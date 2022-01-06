import { combineReducers } from 'redux';
import blogReducer from "./blogReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    blogReducer: blogReducer,
    productsReducer: productsReducer,
    userReducer: userReducer,
    cartReducer: cartReducer
});

export default rootReducer;