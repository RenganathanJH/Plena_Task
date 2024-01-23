import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {}
});

export const {} = cartSlice?.actions;
export default cartSlice?.reducer;