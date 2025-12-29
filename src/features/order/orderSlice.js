import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchOrdersByPagination,
  fetchAllOrders,
  updateOrder,
} from "./orderAPI";

const initialState = {
  orders: [],
  totalItems: 0,
  status: "idle",
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    console.log("updated order>>>" + JSON.stringify(response.data));
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  "orders/fetchAllOrders",
  async () => {
    const response = await fetchAllOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchOrdersByPaginationAsync = createAsyncThunk(
  "orders/fetchWithPage",
  async ({ sort, pagination }) => {
    const response = await fetchOrdersByPagination(sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (item) => item.id === action.payload.id
        );
        state.orders[index] = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByPaginationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByPaginationAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalItems = action.payload.totalItems;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.orders;
export const selectTotalItems = (state) => state.order.totalItems;

export default orderSlice.reducer;
