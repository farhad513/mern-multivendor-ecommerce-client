import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import jwt from "jwt-decode";
export const user_register = createAsyncThunk(
  "auth/user_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/user/register", info, {
        withCredentials: true,
      });
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const user_login = createAsyncThunk(
  "auth/user_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/user/login", info, {
        withCredentials: true,
      });
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const decodeToken = (token) => {
  if (token) {
    const userInfo = jwt(token);
    return userInfo;
  } else {
    return "";
  }
};
export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: decodeToken(localStorage.getItem("userToken")),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: {
    [user_register.pending]: (state, _) => {
      state.loader = true;
    },
    [user_register.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    [user_register.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
    },
    [user_login.pending]: (state, _) => {
      state.loader = true;
    },
    [user_login.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    [user_login.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
    },
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
