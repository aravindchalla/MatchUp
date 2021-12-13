import Reducers from './reducers/reducers.js'
import {createStore} from 'redux'

const store = createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store