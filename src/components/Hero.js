import React from "react";
import { Alert, Container, Row, Col } from "reactstrap";
import "../App.css";
import RequestModal from "./RequestModal";
import VolunteerModal from "./VolunteerModal";

const Hero = () => {
  return (
    <div>
      <div className="flex">
        <div className="text-center ">
          <img
            src={require("../assets/request.jpg")}
            alt="logo"
            height="300"
            width="auto"
            style={{ marginLeft: 20 }}
          />
          <h1 className="mb-4">
            NEEDZO - Enabling Technology to fulfill the needs.
          </h1>
          <Alert color="primary" className="text-center hero my-5">
            NEEDZO connects elderly/physically challenged vulnerable people to
            volunteers ready to help in their community.
          </Alert>
          <div></div>
        </div>
      </div>
      <hr />
      <div className="text-center" style={{ backgroundColor: "" }}>
        <br />
        <h2> Welcome! Read below to learn how NEEDZO works. </h2>
        <br />
        <Container className="text-left">
          <Row>
            <Col xs="12" sm="6">
              <h5>
                <br />
                Self-isolating and need something?
                <br />
                <br />
                Request a delivery from a local volunteer.
                <br />
                <br />
                Want to help your neighbors?
                <br />
                <br />
                Sign up and deliver essential items to physically challenged
                people nearby.
                <br />
                <br />
                <br />
                <br />
                <br />
              </h5>
              <Container>
                <Row>
                  <RequestModal />
                  <VolunteerModal />
                </Row>
              </Container>
            </Col>

            <Col xs="12" sm="6">
              <img
                src={require("../assets/helping-hand.png")}
                alt="logo"
                height="70%"
                width="auto"
                style={{ marginLeft: 20 }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
