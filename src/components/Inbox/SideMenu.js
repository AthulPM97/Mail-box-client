import React from "react";
import { ListGroup, Nav } from "react-bootstrap";

const SideMenu = () => {
  return (
    <ListGroup as="ul" className="mt-2">
      <ListGroup.Item as="li">
        <Nav.Link>Inbox</Nav.Link>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Nav.Link>Unread</Nav.Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SideMenu;
