import { createSlice } from "@reduxjs/toolkit";

const initialState={
   isopen:false
}

export const modalSlice=createSlice({
    name:"modal",
    initialState,
    reducers:{
       modalopen:(state,{payload})=>{
              state.isopen=payload
       }
    }
})

export const {modalopen}=modalSlice.actions