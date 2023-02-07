import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mailActions } from "../../store/mail-slice";
import SideMenu from "../Inbox/SideMenu";
import TopBar from "../Inbox/TopBar";
import MailList from "./MailList";
import ViewSentMail from "./ViewSentMail";

const Outbox = () => {
  //history
  const history = useHistory();

  //store
  const dispatch = useDispatch();

  //states
  const [viewMode, setViewMode] = useState(false);
  const [viewedMail, setViewedMail] = useState(null);

  //side effects
  useEffect(() => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    const getInboxData = async () => {
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
    const getOutboxData = async () => {
        try {
          const response = await fetch(
            `https://mail-box-client-bec77-default-rtdb.firebaseio.com/outbox/${processedEmail}.json`
          );
          if (response.ok) {
            const data = await response.json();
            const keys = Object.keys(data);
            keys.forEach((key) => {
              const mailWithId = {
                ...data[key],
                id: key,
              };
              dispatch(mailActions.setOutbox(mailWithId));
            });
          }
        } catch (err) {
          console.log("error fetching data " + err.message);
        }
      };
    getInboxData();
    getOutboxData();
  }, [dispatch]);

  //handlers
  const composeMailHandler = () => {
    history.push("/draft-mail");
  };

  const viewModeHandler = (mail) => {
    setViewMode(mode => !mode);
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
            {!viewMode && <MailList onMailClick={viewModeHandler}/>}
            {viewMode && <ViewSentMail mail={viewedMail} onBackClick={viewModeHandler}/>}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Outbox;
