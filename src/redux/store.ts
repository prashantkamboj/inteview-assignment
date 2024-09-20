import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducerToDo } from "./mainToDoReducer";

const store = configureStore({
    reducer: combineReducers({ reducerToDo: reducerToDo }),
});
export type RootState = ReturnType< typeof store.getState>;
export default store;