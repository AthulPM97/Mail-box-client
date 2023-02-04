import { createSlice, createStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import Auth from "./Auth";

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

describe('auth page',() => {
    test('render sign up header on load', () => {
        render(<Provider store={store}><Auth/></Provider>);

        const signuptitleElement = screen.getByRole('heading');
        expect(signuptitleElement).toBeInTheDocument();
    });
    test('render email input box on load', () => {
        render(<Provider store={store}><Auth/></Provider>);

        const inputBox = screen.getAllByRole('textbox');
        expect(inputBox).toHaveLength(1);
    });
    test('render sign up button', () => {
        render(<Provider store={store}><Auth/></Provider>);

        const signupBtns = screen.getAllByRole('button');
        expect(signupBtns).toBeInTheDocument;
    });
})