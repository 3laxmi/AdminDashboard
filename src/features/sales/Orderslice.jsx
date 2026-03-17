import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

import { salesData } from '../../components/common/Orderdata';

const Orderslice = createSlice({
    name: 'orderdata',

    initialState:{
        orders : salesData
    },
    reducers:{
        addOrder: (state, action) => {
      state. orders .push(action.payload);
    },

    deleteOrder: (state, action) => {
      state.orders  = state.products.filter(
        (order) => product.id !== action.payload
      );
    },

    updateOrder: (state, action) => {
      const index = state. orders .findIndex(
        (order) => order.id === action.payload.id
      );

      if (index !== -1) {
        state.orders [index] = action.payload;
      }
    }
}
});

export const {addOrder,deleteOrder, updateOrder } = Orderslice.actions;
export default Orderslice.reducer;
