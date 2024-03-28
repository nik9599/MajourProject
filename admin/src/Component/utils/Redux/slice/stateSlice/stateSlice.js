import { createSlice } from "@reduxjs/toolkit";

const initialState={
    New:{
        state:false
    },
    Orders :{
        state:true
    },
    Completed :{
        state:false,
        orderid :"",
        customerId : ""
    },
    OrderDetail :{
        state:false,
        orderid :"",
        customerId : ""
    }
}

export const stateSlice = createSlice({
    name : "stateSlice",
    initialState,
    reducers: {
        NewOrder: (state, action) => {
            state.New.state = action.payload.state;
            state.Orders.state = false;
            state.Completed.state = false;
            state.OrderDetail.state = false ;
        },
        OrderList: (state, action) => {
            state.New.state = false;
            state.Orders.state = true;
            state.Completed.state = false;
            state.OrderDetail.state = false ;
        },
        CompletedOrder: (state, action) => {
            state.New.state = false;
            state.Orders.state = false;           
            state.OrderDetail.state = false ;
            state.Completed.state = true;
            const {orderid  , customerId} = action.payload
            state.Completed.orderid = orderid;
            state.Completed.customerId = customerId;
        },
        OrdeerDetail :(state , action) =>{
            state.New.state = false;
            state.Orders.state = false;
            state.Completed.state = false;
            state.OrderDetail.state = true ;
            const {orderid  , customerId} = action.payload
            state.OrderDetail.orderid = orderid;
            state.OrderDetail.customerId = customerId;
        }
    }
})


export const {NewOrder, OrderList,CompletedOrder,OrdeerDetail} = stateSlice.actions;

export default stateSlice.reducer;