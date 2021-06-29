import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerToolkit from "./reducerToolkit";


let rootReducer= combineReducers({
    lists: reducerToolkit
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


let store = configureStore({
    reducer: rootReducer
})

 
export default store