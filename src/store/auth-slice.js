import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token") || "",
  uid: localStorage.getItem("userId") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.uid);
      state.token = action.payload.token;
      state.uid = action.payload.uid;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
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
        dispatch(authActions.login({ token: data.idToken, uid: data.localId }));
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

export const authActions = authSlice.actions;

export default authSlice.reducer;
