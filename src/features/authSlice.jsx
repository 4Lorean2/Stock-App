import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  loading: false,
  error: false,
  token: "",
}

const authSlice = createSlice({
  name: "auth",
<<<<<<< HEAD

  initialState: {},
  reducers: {},
});
// deneme
//deneme-2
//deneme-3

export const {} = authSlice.actions;
export default authSlice.reducer;
=======
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.user.username
      state.token = payload.token
    },
  
    logoutSuccess: (state) => {
      state.user = ""
      state.loading = false
      state.token = ""
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const {
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchFail,
} = authSlice.actions

export default authSlice.reducer
>>>>>>> componentsRegisterform
