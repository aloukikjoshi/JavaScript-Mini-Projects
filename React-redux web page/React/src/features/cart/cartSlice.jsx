import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    cartitems:[],
    amount:0,
    total:0,
    isloading:false,
}

export const getCartItems=createAsyncThunk("cart/getCartItems",async (name,thunkAPI)=>{
   try{
    const resp=await axios("http://localhost:5000/api")
    return resp.data.dataarr
   }catch(err){
    console.log(err)
   }
}
)




export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        clearcart:(state)=>{
            state.cartitems=[]
         },
        removeitem:(state,action)=>{
            state.cartitems=state.cartitems.filter((item)=>{
            return item.id!==action.payload
         })
        },
        increaseamount:(state,action)=>{
         const itemindex=state.cartitems.findIndex((item)=>item.id===action.payload)
          state.cartitems[itemindex].amount+=1
        },
        decreaseamount:(state,action)=>{
            const i=state.cartitems.findIndex((item)=>item.id===action.payload)
            if(state.cartitems[i].amount>0){
          state.cartitems[i].amount-=1
            }
            if(state.cartitems[i].amount===0){
                state.cartitems=state.cartitems.filter((item)=>{
                    return item.id!==action.payload
                 })
                 
            }
        },
        calculatetotal:(state)=>{
            let totalamount=0
        let totalprice=0
        state.cartitems.forEach((item)=>{
            totalamount+=item.amount
            totalprice+=item.amount*item.price
        })
        state.amount=totalamount
        state.total=totalprice
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getCartItems.pending,(state)=>{
            state.isloading=true
        })
        .addCase(getCartItems.fulfilled,(state,{payload})=>{
            state.isloading=false
            state.cartitems=payload
        })
        .addCase(getCartItems.rejected,(state)=>{
            state.isloading=false
        })
    }
    })


export const {calculatetotal,clearcart,removeitem,increaseamount,decreaseamount}=cartSlice.actions
