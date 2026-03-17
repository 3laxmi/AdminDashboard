import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { productData } from '../../components/common/Productdata'

const Productslice = createSlice({
    name: 'productdata',

    initialState:{
        products : productData
    },
    reducers:{
        addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    }
}
});

export const {addProduct, deleteProduct, updateProduct} = Productslice.actions;
export default Productslice.reducer;
