import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    { price, products, shipping_fee, shippingInfo, items, userId, navigate },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post(
        "/home/order/place-order",
        {
          price,
          products,
          shipping_fee,
          shippingInfo,
          items,
          userId,
          navigate,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      navigate("/payment", {
        state: { price: price + shipping_fee, items, orderId: data.orderId },
      });
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ userId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/order/get-orders/${userId}/${status}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_order_details = createAsyncThunk(
  "order/get_order_details",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/order/get-order/details/${orderId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    successMessage: "",
    errorMessage: "",
    myOrder: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_orders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload.orders;
    },
    [get_order_details.fulfilled]: (state, { payload }) => {
      state.myOrder = payload.order;
    },
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
