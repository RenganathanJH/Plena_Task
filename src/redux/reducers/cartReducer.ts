import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../utills/interface";

interface InitialState {
    cartItems: IProduct[];
    favoriteProduct: {
        [key: string]: boolean;
    } | null;
}

const INITIAL_STATE: InitialState = {
    cartItems: [],
    favoriteProduct: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        getFavoriteProduct: (state, action) => {
            const productId = action?.payload?.id;
            state.favoriteProduct = {
                ...state.favoriteProduct,
                ...{
                    [productId]: action?.payload?.isFavourite
                }
            }
        },
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existingItem: any = state.cartItems?.find((item: IProduct) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                const payload = {
                    ...action.payload,
                    quantity: 1
                }
                state.cartItems.push(payload);
            }
        },
        cartIncrement: (state, action: PayloadAction<IProduct>) => {
            const incrementItem: any = state.cartItems?.find(item => item.id === action.payload?.id);
            if (incrementItem) {
                incrementItem.quantity += 1;
            }
        },
        cartDecrement: (state, action: PayloadAction<IProduct>) => {
            const decrementItem: any = state.cartItems?.find(item => item.id === action.payload?.id);
            if (decrementItem && decrementItem.quantity > 1) {
                decrementItem.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload?.id);
            }
        },
    }
});

export const {
    getFavoriteProduct,
    addToCart,
    cartIncrement,
    cartDecrement
} = cartSlice?.actions;
export default cartSlice?.reducer;