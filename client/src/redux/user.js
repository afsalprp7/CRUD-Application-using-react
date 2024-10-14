import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userLoggedIn : {}
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        addUser : (state,actions)=>{
            console.log(actions.payload)
            state.userLoggedIn = actions.payload
        },

        removeUser: (state)=>{
            state.userLoggedIn = null;
        }
    }
});

export const {addUser,removeUser} = userSlice.actions ;

export default userSlice.reducer;