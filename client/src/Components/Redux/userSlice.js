import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
  },

  reducers: {
    signupSuccess(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    signupFailed(state, action) {
      return {
        ...state,
        isAuthenticated: false,
      };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    loginFailed(state, action) {
      return {
        ...state,
        isAuthenticated: false,
      };
    },
    logout(state, action) {
      localStorage.removeItem("loginToken");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    },
  },
});

export const {
  signupSuccess,
  signupFailed,
  loginSuccess,
  loginFailed,
  logout,
} = userSlice.actions;

export default userSlice.reducer;

// Signup And Login API
export const signupUser = (data) => async (dispatch) => {
  try {
    const sendData = await fetch(
      "https://eight6-agency.onrender.com/users/signup",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const res = await sendData.json();
    return res;
  } catch (err) {
    dispatch(signupFailed());
    return err;
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    const sendData = await fetch(
      "https://eight6-agency.onrender.com/users",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const res = await sendData.json();
    localStorage.setItem("token", res.token);
    return res;
  } catch (err) {
    dispatch(loginFailed());
    return err;
  }
};
