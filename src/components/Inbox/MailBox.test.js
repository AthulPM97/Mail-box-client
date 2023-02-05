import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import MailBox from "./MailBox";

import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../../store/auth-slice';
import mailReducer from '../../store/mail-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        mail: mailReducer,
    }
});

  describe('Rendering the mailbox', () => {
    test('renders the ul', () => {
        render(<Provider store={store}><MailBox/></Provider>);

        const mailList = screen.getByRole('list');
        expect(mailList).toBeInTheDocument;
    });
  });
