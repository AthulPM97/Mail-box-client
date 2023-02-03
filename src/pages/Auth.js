import React, { useState } from "react";
import { Container, NavLink, Row, Col } from "react-bootstrap";
import SigninForm from "../components/Auth/SigninForm";
import SignupForm from "../components/Auth/SignupForm";

const Auth = () => {
  //states
  const [isLogin, setIsLogin] = useState(false);

  //handlers
  const authModeHandler = () => {
    setIsLogin((mode) => !mode);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col md={12} className="p-3 bg-light rounded mx-auto">
          {!isLogin && <SignupForm />}
          {isLogin && <SigninForm />}
        </Col>
        <Container className="border rounded mt-2">
          <div className="text-center m-1 ">
            {!isLogin && (
              <NavLink onClick={authModeHandler}>
                Already have an account? Login
              </NavLink>
            )}
            {isLogin && (
              <NavLink onClick={authModeHandler}>
                Don't have an account? Sign up
              </NavLink>
            )}
          </div>
        </Container>
      </Row>
    </Container>
  );
};

export default Auth;
