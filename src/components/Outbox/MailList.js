import { ListGroup, Col, Row, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";

const MailList = (props) => {
  //store
  const outbox = useSelector((state) => state.mail.outbox);
  const dispatch = useDispatch();

  //handlers
  const deleteMailHandler = (mailId) => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    const deleteMail = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-bec77-default-rtdb.firebaseio.com/outbox/${processedEmail}/${mailId}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          dispatch(mailActions.deleteOutboxMail(mailId));
          console.log("mail deleted");
        }
      } catch (err) {
        console.log("Error deleting mail: " + err.message);
      }
    };
    deleteMail();
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
