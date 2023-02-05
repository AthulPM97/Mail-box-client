import { createSlice } from "@reduxjs/toolkit";

//const processedEmail = email.replace("@", "").replace(".", "")
const mailSlice = createSlice({
  name: "mail",
  initialState: {
    inbox: [],
    outbox: [],
  },
  reducers: {
    send(state, action) {
      state.outbox.push(action.payload);
    },
  },
});

export const sendMail = (draftedMail) => {
  return async (dispatch) => {
    const outbox = async () => {
      const processedEmail = localStorage
        .getItem("email")
        .replace("@", "")
        .replace(".", "");
      const response = await fetch(
        `https://mail-box-client-bec77-default-rtdb.firebaseio.com/outbox/${processedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            recepient: draftedMail.recepient,
            subject: draftedMail.subject,
            message: draftedMail.message,
          }),
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      );
      if (!response.ok) {
        alert("Failed to send mail. Try again!");
      } else {
        const data = await response.json();
        dispatch(mailActions.send({ ...draftedMail, id: data.name }));
        console.log("message stored to DB");
      }
    };
    const recepientInbox = async () => {
      const processedEmail = draftedMail.recepient.replace("@", "").replace(".", "");
      const response = await fetch(
        `https://mail-box-client-bec77-default-rtdb.firebaseio.com/inbox/${processedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            sender: localStorage.getItem('email'),
            subject: draftedMail.subject,
            message: draftedMail.message,
          }),
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      );
      if (!response.ok) {
        alert("Login failed. Please try again.");
      } else {
        console.log("message stored to recepient inbox");
      }
    };

    try {
      await outbox();
      await recepientInbox();
    } catch (error) {
      alert("Error sending mail: " + error.message);
    }
  };
};

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;