import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
})

const reduxStore = configureStore({
    reducer: rootReducer
});

export default reduxStore;