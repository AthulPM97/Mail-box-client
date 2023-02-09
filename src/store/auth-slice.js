import { createSlice } from "@reduxjs/toolkit";

//load saved token
const token = localStorage.getItem('token') || '';

const initialAuthState = {
  isloggedIn: !!token,
  token: token || "",
  email: localStorage.getItem("email") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isloggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.isloggedIn = false;
    },
  },
});

export const signup = (credentials) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkeLsAZA4tK5BDuupyIZHPIL8Nkxcs-6c",
        {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      );
      if (!response.ok) {
        alert("Sign up failed. Please try again.");
      } else {
        const data = await response.json();
        dispatch(authActions.login({ token: data.idToken }));
        console.log("user has signed up successfully")
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };
};

export const signin = (credentials) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkeLsAZA4tK5BDuupyIZHPIL8Nkxcs-6c",
        {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      );
      if (!response.ok) {
        alert("Login failed. Please try again.");
      } else {
        const data = await response.json();
        dispatch(authActions.login({ token: data.idToken }));
        console.log("user has logged in successfully")
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };
};

export const authActions = authSlice.actions;

export default authSlice.reducer;
