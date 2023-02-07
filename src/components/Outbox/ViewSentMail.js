import React from "react";
import { Card, Button } from "react-bootstrap";

const ViewSentMail = (props) => {

    //handlers
    const backClickHandler = () => {
        props.onBackClick();
    }
  return (
    <React.Fragment>
      <div className="border">
        <h3 className="m-2">{props.mail.subject}</h3>
      </div>
      <Card>
        <Card.Header>{props.mail.recepient}</Card.Header>
        <Card.Body>{props.mail.message}</Card.Body>
        <Card.Footer>
          <Button onClick={backClickHandler}>Back</Button>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default ViewSentMail;
