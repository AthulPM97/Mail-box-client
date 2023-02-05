import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const MailBox = () => {
  //store
  const inbox = useSelector((state) => state.mail.inbox);

  const mailItems = inbox.map((mail) => {
    return (
      <Row key={mail.id} className="border">
        <Col md={4}>{mail.sender}</Col>
        <Col md={8}>{mail.subject}</Col>
      </Row>
    );
  });

  return (
    <Container className="mt-2">
      <ListGroup as="ul">{mailItems}</ListGroup>
    </Container>
  );
};

export default MailBox;
