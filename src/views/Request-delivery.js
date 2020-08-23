import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth0 } from "../react-auth0-spa";

import {
  Container,
  Button,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../request.css";
const axios = require("axios");

const Request = () => {
  const { user } = useAuth0();
  return (
    <Container>
      <Card>
        <CardTitle className="task-form-title">
          <strong>Self-isolating? Request a delivery.</strong>
        </CardTitle>
      </Card>
      <Formik
        initialValues={{
          address: "",
          phone: "",
          text: "",
          addon: "",
          tasktype: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);

            //    const token = await getTokenSilently();

            // const headers = {
            //   'Content-Type': 'application/json',
            //   Authorization: "Bearer " +  token
            // }
            //         console.log(headers)
            axios
              .post("http://localhost:5000/api/delreq", {
                type: values.tasktype,
                details: values.text,
                deliveryAddress: values.address,
                deliveryInstructions: values.addon,
                requester: {
                  name: user.name,
                  email: user.email,
                  mobile: values.phone,
                },
              })
              .then(function (response) {
                console.log(response);
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="task-type-group">
              <div className="task-form-type">
                <label>
                  <Field type="radio" name="tasktype" value="Food" />
                  <img
                    className="radio-img"
                    src={require("../assets/groceries_peach_circle.png")}
                    height="100"
                    width="100"
                    alt="grocery-pic"
                  />
                  <div className="task-type-label">Food</div>
                </label>
                <label>
                  <Field type="radio" name="tasktype" value="Medicine" />
                  <img
                    className="radio-img"
                    src={require("../assets/medicine_peach_circle.png")}
                    alt="medicine-pic"
                  />
                  <div className="task-type-label">Medicine</div>
                </label>
                <label>
                  <Field type="radio" name="tasktype" value="Other" />
                  <img
                    className="radio-img"
                    src={require("../assets/other_peach_circle.png")}
                    alt="other-pic"
                  />
                  <div className="task-type-label">Other</div>
                </label>
              </div>
            </div>
            <br /> <br />
            <div className="task-form-group">
              <Label className="task-form-label">
                Where is this being delivered to?
              </Label>
              <Field
                type="address"
                name="address"
                id="exampleEmail"
                placeholder="Eg - 533-A Civil Lines, Sitapur, UP"
              />
            </div>
            <div className="task-form-group">
              <Label className="task-form-label">Phone Number</Label>
              <Field
                type="phone"
                name="phone"
                id="exampleEmail"
                placeholder="Eg - 7292030469"
              />
            </div>
            <div className="task-form-group">
              <Label className="task-form-label">Details</Label>
              <Field
                type="textarea"
                name="text"
                id="exampleEmail"
                placeholder="Eg - Please bring extra sauce with samose"
              />
            </div>

            <div className="task-form-group">
              <Label className="task-form-label">
                Please provide additional delivery instructions
              </Label>
              <br />
              <Field
                type="textarea"
                name="addon"
                id="exampleEmail"
                placeholder="Eg - Press the bell"
              />
            </div>
            {/* <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" /> */}
            <Button type="submit" color="info" size="lg" disabled={isSubmitting}>
              Request delivery
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
export default Request;
