import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Inbox from "./components/Inbox/Inbox";
import MailDrafter from "./components/Mail/MailDrafter";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  //store
  const isloggedIn = useSelector((state) => state.auth.isloggedIn);

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Mailbox</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/inbox">Inbox</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Switch>
        <Route path="/" exact>
          {!isloggedIn && <Auth />}
          {isloggedIn && <Redirect to="/home" />}
        </Route>
        <Route path="/home" exact>
          {isloggedIn && <Home />}
          {!isloggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/draft-mail" exact>
          {isloggedIn && <MailDrafter />}
        </Route>
        <Route path="/inbox" exact>
          {isloggedIn && <Inbox />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
