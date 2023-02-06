import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";

const MailBox = (props) => {
  //store
  const inbox = useSelector((state) => state.mail.inbox);
  const dispatch = useDispatch();

  //handlers
  const deleteMailHandler = (mailItemId) => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    const deleteMail = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-bec77-default-rtdb.firebaseio.com/inbox/${processedEmail}/${mailItemId}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          dispatch(mailActions.deleteMail(mailItemId));
          console.log("mail deleted");
        }
      } catch (err) {
        console.log("Error deleting mail: " + err.message);
      }
    };
    deleteMail();
  };

  //inbox mail list
  const mailItems = inbox.map((mail) => {
    const read = mail.read === true ? true : false;
    return (
      <ListGroup as="li" key={mail.id}>
        <Row className="border m-1 ">
          <Col md={2}>{!read && <Badge>new</Badge>}</Col>
          <Col md={4} onClick={props.onMailClick.bind(null, mail)}>
            {mail.sender}
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
