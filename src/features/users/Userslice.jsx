import { createSlice } from '@reduxjs/toolkit'
import {  usersData } from '../../components/common/Userdata'

const Userslice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
       user : usersData
    },
   reducers:{
        addUser: (state, action) => {
      state.user.push(action.payload);
    },

    deleteUser: (state, action) => {
      state.user = state.user.filter(
        (user) => user.id !== action.payload
      );
    },

    updateUser: (state, action) => {
      const index = state.user.findIndex(
        (user) => user.id === action.payload.id
      );

      if (index !== -1) {
        state.user[index] = action.payload;
      }
    }
}

})
   

export const{addUser, deleteUser, updateUser} = Userslice.actions
export default Userslice.reducer;
