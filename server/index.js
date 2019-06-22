const express = require("express");
const qs = require("querystring");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const request = require("request");
const util = require("util");
const post = util.promisify(request.post);
const app = express();

app.use(bodyParser.json({ extended: true, type: "application/*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/api/helloapi", (req, res) => {
  const name = req.query.name || "Api";
  res.setHeader("ContentType", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

/// Server Code
const TWITTER_OAUTH_CALLBACK_URL = process.env.TWITTER_API_URL;
const TWITTER_OAUTH_CONSUMER_KEY = process.env.TWITTER_CONSUMER_API_KEY;
const TWITTER_OAUTH_CONSUMER_SECRET =
  process.env.TWITTER_CONSUMER_API_SECRET_KEY;
const TWITTER_API_URL = "https://api.twitter.com";
const TWITTER_API_REQUEST_TOKEN_URL = new URL(
  `${TWITTER_API_URL}/oauth/request_token`
);

app.get("/api/oauth/twitter", function(req, res) {
  async function request_token() {
    try {
      const oAuthConfig = {
        callback: TWITTER_OAUTH_CALLBACK_URL,
        consumer_key: TWITTER_OAUTH_CONSUMER_KEY,
        consumer_secret: TWITTER_OAUTH_CONSUMER_SECRET
      };
      const req = await post({
        url: TWITTER_API_REQUEST_TOKEN_URL,
        oauth: oAuthConfig
      });
      if (req.body) {
        return qs.parse(req.body);
      } else {
        throw new Error("Cannot get an OAuth request token");
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  const response = request_token()
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });

  res.setHeader("ContentType", "application/json");

  Promise.all([response])
    .then(function(values) {
      const response = values[0];
      res.send(
        JSON.stringify({
          oauth_callback_confirmed: response.oauth_callback_confirmed,
          oauth_token: response.oauth_token,
          oauth_token_secret: response.oauth_token_secret
        })
      );
    })
    .catch(function(error) {
      res.send(JSON.stringify(error));
    });
});

app.listen(3001, () =>
  console.log(`Express server is running on localhost:3001`)
);
