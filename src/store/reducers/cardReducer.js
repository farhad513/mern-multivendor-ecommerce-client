import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const add_to_card = createAsyncThunk(
  "card/add_to_card",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/card/add", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products_card = createAsyncThunk(
  "card/get_products_card",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get/card/products/${userId}`,
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
export const delete_card_product = createAsyncThunk(
  "card/delete_card_product",
  async (card_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete/card/${card_id}`,
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

export const quantity_increment = createAsyncThunk(
  "card/quantity_increment",
  async (card_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/quantity-increment/${card_id}`,
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

export const quantity_decrement = createAsyncThunk(
  "card/quantity_decrement",
  async (card_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/quantity-decrement/${card_id}`,
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

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/wishlist/add", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_products_wishlist = createAsyncThunk(
  "wishlist/get_products_wishlist",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-wishlist-products/${userId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_wishlist_product = createAsyncThunk(
  "wishlist/delete_wishlist_product",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete/wishlist/${wishlistId}`,
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
export const cardReducer = createSlice({
  name: "card",
  initialState: {
    card_products: [],
    card_product_count: 0,
    wishlist: [],
    wishlist_count: 0,
    buy_product_item: 0,
    price: 0,
    shipping_fee: 0,
    outOfStock: [],
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    reset_count: (state, _) => {
      state.card_product_count = 0;
      state.wishlist_count = 0;
    },
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [add_to_card.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [add_to_card.fulfilled]: (state, { payload }) => {
      state.card_product_count = state.card_product_count + 1;
      state.successMessage = payload.message;
    },
    [get_products_card.fulfilled]: (state, { payload }) => {
      state.card_products = payload.card_products;
      state.price = payload.price;
      state.card_product_count = payload.card_product_count;
      state.outOfStock = payload.outOfStock;
      state.shipping_fee = payload.shipping_fee;
      state.buy_product_item = payload.buy_product_item;
    },
    [delete_card_product.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [quantity_increment.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [quantity_decrement.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [add_to_wishlist.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [add_to_wishlist.fulfilled]: (state, { payload }) => {
      // state.wishlist_count = state.wishlist_count + 1;
      state.wishlist_count =
        state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
      state.successMessage = payload.message;
    },
    [get_products_wishlist.fulfilled]: (state, { payload }) => {
      state.wishlist_count = payload.wishlistCount;
      state.wishlist = payload.wishlists;
    },
    [delete_wishlist_product.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.wishlist = state.wishlist.filter(
        (p) => p._id !== payload.wishlistId
      );
      state.wishlist_count = state.wishlist_count - 1;
    },
  },
});

export const { messageClear, reset_count } = cardReducer.actions;
export default cardReducer.reducer;
