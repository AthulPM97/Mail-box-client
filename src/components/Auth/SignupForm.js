import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "../../store/auth-slice";
import { validate } from "./validate";

const SignupForm = () => {
  //history
  const history = useHistory();

  //refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //store
  const dispatch = useDispatch();

  //handlers
  const signupHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    //validation
    const credentials = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };
    if (validate(credentials)) {
      localStorage.setItem('email', enteredEmail);
      dispatch(signup(credentials));
      history.push("/home");
    }
  };

  return (
    <Container>
      <div className="text-center mb-3">
        <h3>Sign Up</h3>
      </div>
      <Form onSubmit={signupHandler}>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            ref={confirmPasswordRef}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignupForm;
