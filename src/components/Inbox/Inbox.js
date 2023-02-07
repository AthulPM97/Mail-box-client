import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mailActions } from "../../store/mail-slice";
import MailBox from "./MailBox";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";
import ViewMail from "./ViewMail";

const Inbox = () => {
  //history
  const history = useHistory();

  //states
  const [viewingMode, setViewingMode] = useState(false);
  const [viewedMail, setViewedMail] = useState(null);
  const [count, setCount] = useState(0);

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
          let inboxArray = [];
          keys.forEach((key) => {
            const mailWithId = {
              ...data[key],
              id: key,
            };
            inboxArray.push(mailWithId);
          });
          dispatch(mailActions.setInbox(inboxArray));
        }
      } catch (err) {
        console.log("error fetching data " + err.message);
      }
    };
    const intervalId = setInterval(() => {
      getData();
      console.log('get data called');
      setCount(count + 1);
    },2000);
    return () => clearInterval(intervalId);
  }, [dispatch, count]);

  //handlers
  const composeMailHandler = () => {
    history.push('/draft-mail');
  };

  const viewModeHandler = (mail) => {
    setViewingMode(mode => !mode);
    setViewedMail(mail);
  }

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
            {!viewingMode && <MailBox onMailClick={viewModeHandler} />}
            {viewingMode && <ViewMail mail={viewedMail} onBackClick={viewModeHandler}/>}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Inbox;
