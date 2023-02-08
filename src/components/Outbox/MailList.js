import { useState } from "react";
import { ListGroup, Col, Row, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";

const MailList = (props) => {
  //custom hook
  const { error, sendRequest } = useHttp();

  //store
  const outbox = useSelector((state) => state.mail.outbox);
  const dispatch = useDispatch();

  //handlers
  const deleteMailHandler = (mailId) => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    sendRequest({
      url: `https://mail-box-client-bec77-default-rtdb.firebaseio.com/outbox/${processedEmail}/${mailId}.json`,
      method: "DELETE",
    });
    if (!error) {
      dispatch(mailActions.deleteOutboxMail(mailId));
      console.log("mail deleted");
    }
    if (error) {
      console.log("Error deleting mail: " + error);
    }
  };

  const mailItems = outbox.map((mail) => {
    return (
      <ListGroup as="li" key={mail.id}>
        <Row className="border m-1" style={{ cursor: "pointer" }}>
          <Col md={4} onClick={props.onMailClick.bind(null, mail)}>
            <strong>{mail.recepient}</strong>
          </Col>
          <Col md={6}>{mail.subject}</Col>
          <Col md={2}>
            <Button
              variant="outline-danger"
              onClick={deleteMailHandler.bind(null, mail.id)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </ListGroup>
    );
  });
  return (
    <Container className="mt-2">
      <ListGroup as="ul">{mailItems}</ListGroup>
    </Container>
  );
};

export default MailList;
