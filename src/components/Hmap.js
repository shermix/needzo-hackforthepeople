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
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import Axios from "axios";

export const HMap = (props) => {
  const mapRef = React.useRef(null);

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const [details, setDetails] = useState({});

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const API_URL = "http://localhost:5000/api/assign";

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "4KPBKxjiNVDzx7F_50w9gvRBX_GYXUCjV0Xl8-kLLBw",
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 28, lng: 77 },
      zoom: 7,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers);
    const addMarkerfromData = (platform, data) => {
      let service = platform.getSearchService();
      data.map((ele) =>
        service.geocode(
          {
            q: ele.deliveryAddress,
          },
          (result) => {
            let item = result.items[0];
            const currentGroup = new H.map.Group();
            map.addObject(currentGroup);
            map.setCenter(item.position);
            const currentMarker = new H.map.Marker(item.position);
            currentGroup.addObject(currentMarker);
            currentGroup.addEventListener("tap", () => {
              setDetails(ele);
              setModal(!modal);
            });
          },
          alert
        )
      );
    };

    console.log(props.data);
    addMarkerfromData(platform, props.data);

    return () => {
      map.dispose();
    };
  }, [mapRef, props.data]);

  const { user } = useAuth0();
  const handleSubmit = (user, details) => {
    console.log("deta", details);
    let id = details._id;
    const volunteer = {
      name: user?.name,
      email: user?.email,
    };
    Axios.put(API_URL, { id, volunteer }).then((log) => console.log(log));
  };

  return (
    <div>
      <div className="map" ref={mapRef} style={{ height: "500px" }} />
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
                {details.requester?.name}
                <br />
                <br />
                <h3>Details :</h3>
                {details.details}
                <br />
                <br />
                <h3>Address :</h3>
                {details.deliveryAddress}
              </Col>
              <Col xs="12" sm="6">
                <img
                  src={require("../assets/groceries.png")}
                  alt="logo"
                  height="90%"
                  width="100%"
                  style={{ marginLeft: 20 }}
                />
                <center>
                  <h3> Groceries</h3>
                </center>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="info" size="lg" onClick={toggleNested}>
            Help In delivery
          </Button>
          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Thanks for helping Out</ModalHeader>
            <ModalBody>
              <h3>Contact Information : </h3>
              <br />
              Recipient name, address, and contact info will be shared after
              accepting the delivery.
            </ModalBody>
            <ModalFooter>
              <Link to={{ pathname: "/my-deliveries" }}>
                {" "}
                <Button color="info" onClick={handleSubmit(user, details)}>
                  Confirm
                </Button>{" "}
              </Link>
              <Button color="danger" onClick={toggleNested}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Button color="danger" size="lg" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};