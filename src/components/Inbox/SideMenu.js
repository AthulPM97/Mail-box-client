import React from "react";
import { Badge, ListGroup, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

const SideMenu = () => {

  //store 
  const inbox = useSelector(state => state.mail.inbox);

  //unread mail count
  const unreadMailCount = inbox.reduce((count,mail) => {
    if(mail.read === 'false' || mail.read === false) {
      count++;
      return count;
    }
    return count;
  },0);

  return (
    <ListGroup as="ul" className="mt-2">
      <ListGroup.Item as="li">
        <Nav.Link href="/inbox">Inbox</Nav.Link>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Nav.Link>Unread<Badge>{unreadMailCount}</Badge></Nav.Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SideMenu;
