import React from "react";
import { Container, NavLink, Row, Col } from "react-bootstrap";
import SignupForm from "../components/Auth/SignupForm";

const Auth = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col md={12} className="p-3 bg-light rounded mx-auto">
          <div className="text-center mb-3">
            <h3>Sign Up</h3>
          </div>
          <SignupForm />
        </Col>
        <Container className="border rounded mt-2">
          <div className="text-center m-1 ">
            <NavLink>Already have an account? Login</NavLink>
          </div>
        </Container>
      </Row>
    </Container>
  );
};

export default Auth;
