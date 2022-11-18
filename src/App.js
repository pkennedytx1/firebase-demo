import { initializeApp } from "firebase/app";
import { useState } from 'react';
import { Navbar, Container, Form, Button, Spinner } from "react-bootstrap";
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const storeInqury = async (e) => {
    e.preventDefault()
    setIsSending(true);
    try {
      await addDoc(collection(db, "inquires"), {
        email,
        message 
      });
      setShowInfo(true)
      setTimeout(() => {
        setShowInfo(false)
        setIsSending(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">Firebase Demo</Navbar.Brand>
        </Container>
      </Navbar>
      {showInfo ?
        <div style={{ maxWidth: '400px', margin: '0 auto'}} >
          Your inquiry has been recieved, please look out for a confirmation receipt at the entered email.
        </div> :
        <Form style={{ maxWidth: '400px', margin: '0 auto'}} onSubmit={(e) => storeInqury(e)}>
        <h1>Howdy Hey</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control disabled={isSending} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control disabled={isSending} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message" />
        </Form.Group>
        <Button disabled={isSending} variant="primary" type="submit">
          {isSending ? 
            <>
              Sending Inquiry
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </> :
            <>
              Send Inquiry
            </>
          }
        </Button>
      </Form>
      }
    </div>
  );
}

export default App;
