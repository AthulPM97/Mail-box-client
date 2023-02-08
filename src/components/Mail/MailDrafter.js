import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { sendMail } from "../../store/mail-slice";

const MailDrafter = () => {
  //store
  const dispatch = useDispatch();

  //state
  const [editorState, setEditorState] = useState(null);

  //refs
  const recepientRef = useRef();
  const subjectRef = useRef();

  //handlers
  const editorStateChangeHandler = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const sendMailHandler = (event) => {
    event.preventDefault();
    //user input
    const enteredRecepient = recepientRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const enteredMessage = editorState.getCurrentContent().getPlainText();

    const draftedMail = {
      recepient: enteredRecepient,
      subject: enteredSubject,
      message: enteredMessage,
    };
    dispatch(sendMail(draftedMail));
  };

  return (
    <Container className="border">
      <Form onSubmit={sendMailHandler}>
        <Form.Control
          type="text"
          ref={recepientRef}
          placeholder="Recepient email"
          className="mt-2 mb-2"
        />
        <Form.Control
          type="text"
          ref={subjectRef}
          placeholder="Subject"
          className="mb-2"
        />
        <Container className="border mb-2" style={{ minHeight: 300 }}>
          <Editor
            editorState={editorState}
            onEditorStateChange={editorStateChangeHandler}
          />
        </Container>
        <Button variant="outline-primary" type="submit" className="mb-2">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default MailDrafter;
