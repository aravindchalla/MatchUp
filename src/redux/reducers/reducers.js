import { combineReducers } from 'redux';
import blogReducer from "./blogReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({blogReducer: blogReducer,productsReducer: productsReducer,userReducer: userReducer});

export default rootReducer;