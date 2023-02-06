import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

const Navigationbar = () => {
  //store
  const dispatch = useDispatch();

  //history
  const history = useHistory();

  //handlers
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push('/');
  };

  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/inbox">Mailbox</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
          <Button
            variant="danger"
            className="float-end"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Container>
      </Navbar>
      <br />
    </React.Fragment>
  );
};

export default Navigationbar;
