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
const RequestModal = () => {
  const [modal, setModal] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button color="info" size="lg" onClick={toggle}>
        Request a Delivery
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        contentClassName="custom-modal-style"
        labelledBy="request"
      
      >
        <ModalHeader toggle={toggle}>How To Request A Delivery</ModalHeader>
        <ModalBody>
          <Container className="text-left">
            <Row>
              <Col xs="12" sm="6">
                <h5 color="blue">
                <br />
                <br />
              
               1. Log in, select 'Request a Delivery', and fill out the form.
                <br />
                <br />
                <br />
                <br />
               2. You'll be notified once a neighbor volunteers to deliver your
                items.
                </h5>
              </Col>
              <Col xs="12" sm="6">
                <img
                  src={require("../assets/request.png")}
                  alt="logo"
                  height="80%"
                  width="80%"
                  style={{ marginLeft: 20 }}
                />
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
              size="lg"
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </Button>
          )}
          <Button color="danger" onClick={toggle} size="lg">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default RequestModal;
