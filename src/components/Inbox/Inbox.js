import { useEffect } from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mailActions } from "../../store/mail-slice";
import MailBox from "./MailBox";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";

const Inbox = () => {
  //history
  const history = useHistory();

  //store
  const dispatch = useDispatch();

  //side effects
  useEffect(() => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    const getData = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-bec77-default-rtdb.firebaseio.com/inbox/${processedEmail}.json`
        );
        if (response.ok) {
          const data = await response.json();
          const keys = Object.keys(data);
          console.log(keys);
          keys.forEach((key) => {
            console.log(data[key]);
            const mailWithId = {
              ...data[key],
              id: key,
            };
            dispatch(mailActions.setInbox(mailWithId));
          });
        }
      } catch (err) {
        console.log("error fetching data " + err.message);
      }
    };
    getData();
  }, [dispatch]);

  //handler
  const composeMailHandler = () => {
    history.push('/draft-mail');
  };

  return (
    <Container className="m-1">
      <Row>
        <Col md={2}>
          <Container>
            <Button variant="primary" onClick={composeMailHandler}>
              Compose
            </Button>
            <SideMenu />
          </Container>
        </Col>
        <Col md={10}>
          <Container>
            <TopBar />
            <MailBox />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Inbox;
