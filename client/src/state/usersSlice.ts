import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
const axios = require("axios").default;

type UserPayload = {
  email: string;
};

interface UserState {
  isLoggedIn: boolean;
  email: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  email: "",
};

export const getUserData = createAsyncThunk(
  "user/getData",
  async ({ rejectWithValue }: any) => {
    try {
      const res = await axios
        .get("/users/getData")
        .then((res: any) => res.data);
      return res;
    } catch (e) {
      console.log(e);
      return rejectWithValue();
    }
  }
);

export const logIn = createAsyncThunk(
  "user/login",
  async (loginData: any, { rejectWithValue }: any) => {
    try {
      const res = await axios.post("/users/login", loginData);
      return res.data;
    } catch (e) {
      return rejectWithValue();
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async () => {
  try {
    const res = await axios.get("/users/logout");
    return res.data;
  } catch (e) {
    console.log(e);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserData.fulfilled,
      (state, action: PayloadAction<UserPayload>) => {
        state.isLoggedIn = true;
        state.email = action.payload.email;
      }
    );
    builder.addCase(
      logIn.fulfilled,
      (state, action: PayloadAction<UserPayload>) => {
        state.isLoggedIn = true;
        state.email = action.payload.email;
      }
    );
    builder.addCase(logOut.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.email = "";
    });
  },
});

export default userSlice.reducer;
