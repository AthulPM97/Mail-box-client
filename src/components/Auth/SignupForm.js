import { Container, Form, Button } from "react-bootstrap";

const SignupForm = () => {
  return (
    <Container>
      <Form>
        <Form.Group className="mb-2">
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control type="password" placeholder="Confirm password" />
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
