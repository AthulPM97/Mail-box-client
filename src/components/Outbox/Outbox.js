import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";
import SideMenu from "../Inbox/SideMenu";
import TopBar from "../Inbox/TopBar";
import MailList from "./MailList";
import ViewSentMail from "./ViewSentMail";

const Outbox = () => {
  //history
  const history = useHistory();

  //custom hook
  const { error, sendRequest } = useHttp();

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
    sendRequest(
      {
        url: `https://mail-box-client-bec77-default-rtdb.firebaseio.com/inbox/${processedEmail}.json`,
      },
      (data) => {
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
    );
    if (error) {
      console.log("Error fetching data: " + error);
    }
    sendRequest(
      {
        url: `https://mail-box-client-bec77-default-rtdb.firebaseio.com/outbox/${processedEmail}.json`,
      },
      (data) => {
        const keys = Object.keys(data);
        let outboxArray = [];
        keys.forEach((key) => {
          const mailWithId = {
            ...data[key],
            id: key,
          };
          outboxArray.push(mailWithId);
        });
        dispatch(mailActions.setOutbox(outboxArray));
      }
    );
    if (error) {
      console.log("Error fetching data: " + error);
    }
  }, [dispatch]);

  //handlers
  const composeMailHandler = () => {
    history.push("/draft-mail");
  };

  const viewModeHandler = (mail) => {
    setViewMode((mode) => !mode);
    setViewedMail(mail);
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
            {!viewMode && <MailList onMailClick={viewModeHandler} />}
            {viewMode && (
              <ViewSentMail mail={viewedMail} onBackClick={viewModeHandler} />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Outbox;
