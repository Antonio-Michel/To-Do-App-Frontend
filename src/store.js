import {configureStore} from "@reduxjs/toolkit";
import todosReducer from "./slices/todosSlice";

const reducer = {
  todos: todosReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
