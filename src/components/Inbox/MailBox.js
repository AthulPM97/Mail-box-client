import { Badge, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MailBox = (props) => {
  //store
  const inbox = useSelector((state) => state.mail.inbox);

  const mailItems = inbox.map((mail) => {
    const read = mail.read === true? true : false ;
    return (
      <Link key={mail.id}>
        <Row
          className="border m-1 "
          onClick={props.onMailClick.bind(null, mail)}
        >
          <Col md={2}>{!read && <Badge>new</Badge>}</Col>
          <Col md={4}>{mail.sender}</Col>
          <Col md={6}>{mail.subject}</Col>
        </Row>
      </Link>
    );
  });

  return (
    <Container className="mt-2">
      <ListGroup as="ul">{mailItems}</ListGroup>
    </Container>
  );
};

export default MailBox;
