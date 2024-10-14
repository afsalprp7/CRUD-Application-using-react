import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    adminDetails : {},
    editUser : {},
    searchResult: ''
}

const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers : {
        addAdmin : (state,actions) =>{
            state.adminDetails = actions.payload
         },
         removeAdmin : (state)=>{
            state.adminDetails = null
         },

         addEditUserData : (state,actions)=>{
            state.editUser = actions.payload;
         },
         saveSearchResult : (state,actions)=>{
            state.searchResult = actions.payload
         }
    }
});

export const {addAdmin , removeAdmin,addEditUserData,saveSearchResult } = adminSlice.actions ;

export default adminSlice.reducer