import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/ThemeSlice"
import productReducer from "../features/products/Productslice"
import userReducer from "../features/users/Userslice"
import orderReducer from "../features/sales/Orderslice"
import profileReducer from "../features/profile/ProfileSlice"

export const Store = configureStore({
    reducer: {
        theme: themeReducer,
        product: productReducer,
        user: userReducer,
        orders: orderReducer,
        profile: profileReducer
    },
})