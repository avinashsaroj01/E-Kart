import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, createUser, signOut, checkAuth, ResetPassword, sendResetPasswordOtp } from "./authAPI";
import { updateUser } from "../user/userAPI";

const initialState = {
  loggedInUserToken: null, // this should only contain user indentity i.e.  id  , user role
  status: "idle",
  error: null,
  userChecked: false,
  passwordResetOtp: "",
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const signOutAsync = createAsyncThunk("user/signOut", async (userId) => {
  const response = await signOut(userId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const loginUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo) => {
    const response = await loginUser(loginInfo);
    console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  
  const response = await checkAuth();
  console.log(response)
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});
export const sendResetPasswordOtpAsync = createAsyncThunk(
  "user/sendResetPasswordOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const data = await sendResetPasswordOtp({ email });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const verifyResetPasswordOtpAsync = createAsyncThunk(
  "user/VerifyPasswordOtp",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const data = await ResetPassword({ email, otp, newPassword });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(sendResetPasswordOtpAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendResetPasswordOtpAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordResetOtp = action.payload;
      })
      .addCase(verifyResetPasswordOtpAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyResetPasswordOtpAsync.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
