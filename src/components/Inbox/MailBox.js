import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const MailBox = () => {
  //store
  const inbox = useSelector((state) => state.mail.inbox);
  console.log(inbox);

  const mailItems = inbox.map((mail) => {
    return (
      <ListGroup horizontal key={mail.id}>
        <ListGroup.Item as="li">{mail.sender}</ListGroup.Item>
        <ListGroup.Item>{mail.subject}</ListGroup.Item>
        <ListGroup.Item>{mail.message}</ListGroup.Item>
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
