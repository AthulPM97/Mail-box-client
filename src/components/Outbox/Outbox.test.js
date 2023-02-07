import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import authReducer from "../../../store/auth-slice";
import mailReducer from "../../../store/mail-slice";
import Outbox from "./Outbox";

const store = configureStore({
    reducer: {
      auth: authReducer,
      mail: mailReducer,
    },
  });

  describe('outbox component', () => {
    test('renders compose button', () => {
        render(<Provider store={store}><Outbox/></Provider>);

        const composeBtn = screen.getByText('Compose');
        expect(composeBtn).toBeInTheDocument;
    });
    test('renders list of mail items', () => {
        render(<Provider store={store}><Outbox/></Provider>);

        const mailList = screen.getAllByRole('listitem');
        expect(mailList).not.toHaveLength(0);
    })
  })