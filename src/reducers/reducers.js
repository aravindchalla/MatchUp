import { combineReducers } from 'redux';
import blogReducer from "./blogReducer";
import productsReducer from "./productsReducer";


const rootReducer = combineReducers({blogReducer: blogReducer,productsReducer: productsReducer});

export default rootReducer;