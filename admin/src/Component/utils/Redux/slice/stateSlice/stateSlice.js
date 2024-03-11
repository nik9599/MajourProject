import { createSlice } from "@reduxjs/toolkit";

const initialState={
    New:{
        state:false
    },
    Orders :{
        state:true
    },
    Completed :{
        state:false
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
        },
        OrderList: (state, action) => {
            state.New.state = false;
            state.Orders.state = true;
            state.Completed.state = false;
        },
        CompletedOrder: (state, action) => {
            state.New.state = false;
            state.Orders.state = false;
            state.Completed.state = true;
        },
    }
})


export const {NewOrder, OrderList,CompletedOrder} = stateSlice.actions;

export default stateSlice.reducer;