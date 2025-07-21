import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cart/cartSlice";
import { modalSlice } from "./features/modal/modalSlice";


export const store=configureStore({
    reducer:{
        cart:cartSlice.reducer,
        modal:modalSlice.reducer,
    }
})