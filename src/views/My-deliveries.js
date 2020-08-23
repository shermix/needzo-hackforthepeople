
import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Alert,
} from "reactstrap";
import { useAuth0 } from "../react-auth0-spa";
import Axios from "axios";
import Chat from "../components/Chat";

const Deliveries = () => {
  const API_URL = "http://localhost:5000/api/mydelivery";
  const { loading, user } = useAuth0();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const onActive = () => setVisible(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    const volunteer = {
      name: user?.name,
      email: user?.email,
    };
    loadData(volunteer);
  }, []);

  const loadData = async (user) => {
    const response = await Axios.post(API_URL, user);
    const res = await response.data;
    setData(res);
    console.log(res);
  };

  const handleComplete = (details) => {
    console.log("deta", details);
    let id = details._id;
    Axios.put("http://localhost:5000/api/complete", { id }).then((log) =>
      console.log(log)
    );
    onActive();
  };

  const handleCancel = (details) => {
    console.log("deta", details);
    let id = details._id;
    Axios.put("http://localhost:5000/api/dismiss", { id }).then((log) =>
      console.log(log)
    );
    onActive();
    loadData(details.volunteer);
  };

  return (
    <div>
      <div className="flex-container">
        {data.map((del) => (
          <Card id="card" key={Math.random()}>
            <CardBody>
              <CardTitle>
                <h3>Delivery details</h3>
              </CardTitle>{" "}
              <br />
              <CardSubtitle>
                <b>Requester Name :</b> <br />
                {del.requester?.name}
              </CardSubtitle>
              <br />
              <CardText>
                <b>Phone Number :</b> <br />
                <a> {del.requester?.mobile}</a>
                <br /> <br />
                <b>Address :</b> <br />
                <a
                  className="card-address-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/dir/?api=1&amp;destination=533-A Civil Lines, Sitapur, UP"
                >
                  {del.deliveryAddress}
                </a>
              </CardText>
              <br />
              <div className="flex-container">
                <Button color="info" onClick={() => handleComplete(del)}>
                  COMPLETED DELIVERY
                </Button>
                <Button color="danger" onClick={() => handleCancel(del)}>
                  CANCEL
                </Button>
              </div>
              <div className="cardimg">
                <img
                  width="40%"
                  src={require("../assets/other.png")}
                  alt="Card image cap"
                />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <br /> <br />
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        <center>
          {" "}
          <h2>Thank You For Choosing Helping Hands.</h2>{" "}
        </center>
      </Alert>
      <Chat></Chat>
    </div>
  );
};

export default Deliveries;