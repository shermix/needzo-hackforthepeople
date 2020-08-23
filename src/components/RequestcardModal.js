import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../App.css";
import { useAuth0 } from "../react-auth0-spa";
const RequestCardModal = () => {
  const [modal, setModal] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button color="info" size="lg" onClick={toggle}>
        Click me
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        contentClassName="custom-modal-style"
        labelledBy="request"
      >
        <ModalHeader toggle={toggle}>Help others by Volunteering</ModalHeader>
        <ModalBody>
          <Container className="text-left">
            <Row>
              <Col xs="12" sm="6">
                <br />
                <h3> Deliver To :</h3>
                <br />
                <br />
                <h3>Details :</h3>
                <br />
                <br />
                <h3>Address :</h3>
              </Col>
              <Col xs="12" sm="6">
                <img
                  src={require("../assets/groceries.png")}
                  alt="logo"
                  height="90%"
                  width="100%"
                  style={{ marginLeft: 20 }}
                />
             <center><h3> Groceries</h3></center>   
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          {!isAuthenticated && (
            <Button
              id="qsLoginBtn"
              color="info"
              className="btn-margin"
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </Button>
          )}
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default RequestCardModal;
