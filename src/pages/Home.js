import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  const userMail = localStorage.getItem('email');
  return (
    <Container>
      <h1>Welcome to your mail box</h1>
      <h2>{userMail}</h2>
      <NavLink to='/inbox'>You have unread mail!</NavLink>
    </Container>
  );
};

export default Home;
