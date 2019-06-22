const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const axios = require("axios");
const app = express();

app.use(bodyParser.json({ extended: true, type: "application/*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/api/helloapi", (req, res) => {
  const name = req.query.name || "Api";
  res.setHeader("ContentType", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log(`Express server is running on localhost:3001`)
);