import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import listsReducer from "./listsRuducer";


let rootReducer= combineReducers({
    lists: listsReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
window.store= store;

export default store