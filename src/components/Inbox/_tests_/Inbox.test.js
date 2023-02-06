import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import authReducer from "../../../store/auth-slice";
import mailReducer from "../../../store/mail-slice";
import Inbox from "../Inbox";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mail: mailReducer,
  },
});

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }

describe('rendering the inbox component', () => {
    test('render compose button', () => {
        render(<Provider store={store}><Inbox/></Provider>);

        window.localStorage = new LocalStorageMock;
        window.localStorage.setItem('email', 'athul@gmail.com');

        const composeBtn = screen.getByText('Compose');
        expect(composeBtn).toBeInTheDocument;
    });
});