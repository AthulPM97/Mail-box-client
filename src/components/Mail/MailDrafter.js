import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MailDrafter = () => {
  //state
  const [editorState, setEditorState] = useState(null);

  //refs
  const recepientRef = useRef();
  const subjectRef = useRef();

  //handlers
  const editorStateChangeHandler = (newEditorState) => {
    setEditorState(newEditorState);
    console.log(editorState.getCurrentContent().getPlainText());
  };
  const sendMailHandler = (event) => {
    event.preventDefault();
    //user input
    const enteredRecepient = recepientRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const enteredMessage = editorState.getCurrentContent().getPlainText();
  };

  return (
    <Container className="border">
      <Form onSubmit={sendMailHandler}>
        <Form.Control type="text" ref={recepientRef} placeholder='Recepient email' />
        <Form.Control type="text" ref={subjectRef} placeholder='Subject' />
        <Container >
          <Editor
            editorState={editorState}
            onEditorStateChange={editorStateChangeHandler}
          />
        </Container>
        <Button variant="outline-primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default MailDrafter;
