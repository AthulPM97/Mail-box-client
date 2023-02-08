import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";
import MailBox from "./MailBox";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";
import ViewMail from "./ViewMail";

const Inbox = () => {
  //history
  const history = useHistory();

  //custom hook
  const { error, sendRequest } = useHttp();

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
    const intervalId = setInterval(() => {
      console.log("get data called");
      setCount(count + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [dispatch, count]);

  //handlers
  const composeMailHandler = () => {
    history.push("/draft-mail");
  };

  const viewModeHandler = (mail) => {
    setViewingMode((mode) => !mode);
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
            {!viewingMode && <MailBox onMailClick={viewModeHandler} />}
            {viewingMode && (
              <ViewMail mail={viewedMail} onBackClick={viewModeHandler} />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Inbox;
