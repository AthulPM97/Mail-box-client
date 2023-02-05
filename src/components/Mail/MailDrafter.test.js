import { createSlice, createStore } from "@reduxjs/toolkit";
import {
  fireEvent,
  getAllByRole,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import MailDrafter from "./MailDrafter";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    outbox: [],
  },
  reducers: {
    send: () => {},
  },
});

const store = createStore(mailSlice.reducer);

window.fetch = jest.fn().mockResolvedValue({
  json: () => Promise.resolve({}),
});

describe("mail drafter", () => {
  test("renders three input boxes", () => {
    render(
      <Provider store={store}>
        <MailDrafter />
      </Provider>
    );

    const inputTextBoxes = screen.getAllByRole("textbox");
    expect(inputTextBoxes).toHaveLength(3);
  });
  test("renders button", () => {
    render(
      <Provider store={store}>
        <MailDrafter />
      </Provider>
    );

    const sendBtn = screen.getByRole("button");
    expect(sendBtn).toBeInTheDocument;
  });
  test("submit form and make post request", async () => {
    //Arrange
    render(
      <Provider store={store}>
        <MailDrafter />
      </Provider>
    );

    //Act
    const submitBtn = screen.getByRole("button");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalled;
    });
  });
});
