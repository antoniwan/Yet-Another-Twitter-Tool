const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const pino = require("express-pino-logger")();

const twitter = require("./libs/twitter");

app.use(bodyParser.json({ extended: true, type: "application/*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/api/helloapi", (req, res) => {
  const name = req.query.name || "Api";
  res.setHeader("ContentType", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get("/api/oauth/twitter/request_token", async function(_req, res) {
  try {
    const response = await twitter.request_token();
    res.json({
      oauth_callback_confirmed: response.oauth_callback_confirmed,
      oauth_token: response.oauth_token,
      oauth_token_secret: response.oauth_token_secret
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

app.get("/api/oauth/twitter/convert_token", async function(req, res) {
  try {
    const response = await twitter.convert_token(
      req.query.oauth_token,
      req.query.oauth_verifier
    );
    res.json({
      response
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

app.listen(3001, () =>
  console.log(`Express server is running on localhost:3001`)
);
