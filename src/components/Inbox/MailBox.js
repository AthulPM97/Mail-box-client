import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";

const MailBox = (props) => {
  //custom hooks
  const { error, sendRequest } = useHttp();

  //store
  const inbox = useSelector((state) => state.mail.inbox);
  const dispatch = useDispatch();

  //handlers
  const deleteMailHandler = (mailItemId) => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    sendRequest({
      url: `https://mail-box-client-bec77-default-rtdb.firebaseio.com/inbox/${processedEmail}/${mailItemId}.json`,
      method: "DELETE",
    });

    if (!error) {
      dispatch(mailActions.deleteMail(mailItemId));
      console.log("mail deleted");
    }
    if (error) {
      console.log("Error deleting mail: " + error);
    }
  };

  //inbox mail list
  const mailItems = inbox.map((mail) => {
    const read = mail.read === true ? true : false;
    return (
      <ListGroup as="li" key={mail.id}>
        <Row className="border m-1" style={{ cursor: "pointer" }}>
          <Col md={2}>{!read && <Badge>new</Badge>}</Col>
          <Col md={4} onClick={props.onMailClick.bind(null, mail)}>
            <strong>{mail.sender}</strong>
          </Col>
          <Col md={4}>{mail.subject}</Col>
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

export default MailBox;
