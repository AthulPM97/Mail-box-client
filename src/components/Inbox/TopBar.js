import { Button, Nav } from "react-bootstrap";

const TopBar = () => {
  return (
    <Nav className="justify-content-center" activeKey="/inbox">
      <Nav.Item>
        <Button variant="outline-primary">Archive</Button>
      </Nav.Item>
      <Nav.Item>
        <Button variant="outline-warning">Spam</Button>
      </Nav.Item>
    </Nav>
  );
};

export default TopBar;
