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
const VolunteerModal = () => {
  const [modal, setModal] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Col>
        <Button color="success" size="lg" onClick={toggle}>
          Become a Volunteer
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          contentClassName="custom-modal-style"
        >
          <ModalHeader toggle={toggle}>How To Volunteer ?</ModalHeader>
          <ModalBody>
            <Container className="text-left">
              <Row>
                <Col xs="12" sm="6">
                  <h5>
                  <br />
                  1.  Sign up and browse delivery requests from neighbors nearby by clicking on the marker on the map.
                  <br /> <br />
                  <br /> <br />
                  2. Once you've claimed a delivery, we'll share your neighbor's
                  contact information so you can get in touch.
                  <br /> <br />
                  </h5>
                </Col>
                <Col xs="12" sm="6">
                  <img
                    src={require("../assets/delivery.png")}
                    alt="logo"
                    height="90%"
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
      </Col>
    </div>
  );
};
export default VolunteerModal;
