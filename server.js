const express = require("express");
const Task = require("./models/task");
const { join } = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT || 5000;

const db = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0-r6yin.mongodb.net/collection0?retryWrites=true&w=majority`;

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(express.static(join(__dirname, "frontend/build")));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://xatishayxtech.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: "https://xatishayxtech.auth0.com/api/v2/",
  issuer: `https://xatishayxtech.auth0.com/`,
  algorithms: ["RS256"],
});

app.get("/api/delivery", (req, res) => {
  Task.find({ status: 0 })
    .exec()
    .then((tasks) => res.send(tasks));
});

//routes after this will require authentication
//app.use(checkJwt);

app.post("/api/mydelivery", (req, res) => {
  // console.log(req.body);
  Task.find({
    status: 1,
    volunteer: { name: req.body.name, email: req.body.email },
  })
    .exec()
    .then((tasks) => res.send(tasks));
});

app.post("/api/delreq", (req, res) => {
  // console.log(req)
  const task = new Task({
    type: req.body.type,
    details: req.body.details,
    deliveryAddress: req.body.deliveryAddress,
    deliveryInstructions: req.body.deliveryInstructions,
    requester: req.body.requester,
    status: 0,
  });

  task
    .save()
    .then((result) => res.status(200).json({ result }))
    .catch((err) => console.log(err) && res.status(500).json({ error: err }));
});

app.put("/api/assign", (req, res) => {
  Task.findByIdAndUpdate(
    req.body.id,
    { status: 1, volunteer: req.body.volunteer },
    { returnOriginal: false }
  ).then((tasks) => res.send(tasks));
});

app.put("/api/complete", (req, res) => {
  Task.findByIdAndUpdate(
    req.body.id,
    { status: 2 },
    { returnOriginal: false }
  ).then((tasks) => res.send(tasks));
});

app.put("/api/dismiss", (req, res) => {
  Task.findByIdAndUpdate(
    req.body.id,
    { status: 0 },
    { returnOriginal: false }
  ).then((tasks) => res.send(tasks));
});

app.listen(port, () => console.log(`Listening on port ${port}`));