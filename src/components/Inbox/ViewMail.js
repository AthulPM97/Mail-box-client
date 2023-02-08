import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";

const ViewMail = (props) => {
  //store
  const dispatch = useDispatch();

  //custom hook
  const { error, sendRequest } = useHttp();

  //side effects
  useEffect(() => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    sendRequest({
      url: `https://mail-box-client-bec77-default-rtdb.firebaseio.com/inbox/${processedEmail}/${props.mail.id}.json`,
      method: "PUT",
      body: {
        message: props.mail.message,
        sender: props.mail.sender,
        subject: props.mail.subject,
        read: true,
      },
    });
    if (!error) {
      dispatch(mailActions.updateReadReceipt(props.mail.id));
    }
    if (error) {
      console.log("Error updating read receipt: " + error);
    }
  }, [dispatch]);

  //handlers
  const backClickHandler = () => {
    props.onBackClick();
  };

  return (
    <React.Fragment>
      <div className="border">
        <h3 className="m-2">{props.mail.subject}</h3>
      </div>
      <Card>
        <Card.Header>{props.mail.sender}</Card.Header>
        <Card.Body>{props.mail.message}</Card.Body>
        <Card.Footer>
          <Button onClick={backClickHandler}>Back</Button>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default ViewMail;
