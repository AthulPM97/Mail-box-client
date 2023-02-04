import { createSlice, createStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import SigninForm from "./SigninForm"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isLoggedIn: null,
    },
    reducers: {
      login: (state) => {
        state.isLoggedIn = true;
      },
    },
  });
  
  const store = createStore(authSlice.reducer);

describe('Login form', () => {
    test('email input box renders', () => {
        render(<Provider store={store}><SigninForm/></Provider>);

        const emailInputBox = screen.getByRole('textbox');
        expect(emailInputBox).toBeInTheDocument;
    });
    test('login button renders', () => {
        render(<Provider store={store}><SigninForm/></Provider>);

        const loginBtn = screen.getByRole('button');
        expect(loginBtn).toBeInTheDocument;
    });
    test('login header renders', () => {
        render(<Provider store={store}><SigninForm/></Provider>);

        const header = screen.getByRole('heading');
        expect(header).toBeInTheDocument;
    });
})