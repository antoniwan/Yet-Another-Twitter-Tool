const request = require("request");
const util = require("util");
const qs = require("querystring");
const post = util.promisify(request.post);
const get = util.promisify(request.get);

const TWITTER_OAUTH_CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;
const TWITTER_OAUTH_CONSUMER_KEY = process.env.TWITTER_CONSUMER_API_KEY;
const TWITTER_OAUTH_CONSUMER_SECRET =
  process.env.TWITTER_CONSUMER_API_SECRET_KEY;
const TWITTER_API_URL = "https://api.twitter.com";

const twitter = (function() {
  async function request_token() {
    const oAuthConfig = {
      callback: TWITTER_OAUTH_CALLBACK_URL,
      consumer_key: TWITTER_OAUTH_CONSUMER_KEY,
      consumer_secret: TWITTER_OAUTH_CONSUMER_SECRET
    };
    const request = await post({
      url: new URL(`${TWITTER_API_URL}/oauth/request_token`),
      oauth: oAuthConfig
    });
    if (request.statusCode === 200) {
      return qs.parse(request.body);
    } else {
      throw new Error("Unable to get oAuth Request Token");
    }
  }

  async function convert_token(oauth_token, oauth_verifier) {
    const oAuthConfig = {
      consumer_key: TWITTER_OAUTH_CONSUMER_KEY,
      consumer_secret: TWITTER_OAUTH_CONSUMER_SECRET,
      token: oauth_token
    };
    const request = await post({
      url: new URL(
        `${TWITTER_API_URL}/oauth/access_token?oauth_verifier=${oauth_verifier}`
      ),
      oauth: oAuthConfig
    });

    if (request.statusCode === 200) {
      return qs.parse(request.body);
    } else {
      throw new Error("Unable to get oAuth Access Token");
    }
  }

  async function get_profile(oauth_token, screen_name) {
    const request = await get({
      url: new URL(
        `${TWITTER_API_URL}/1.1/users/show.json?screen_name=${screen_name}`
      ),
      headers: {
        authorization: `Bearer ${oauth_token}`
      }
    });

    console.log(request);

    if (request.statusCode === 200) {
      return qs.parse(request.body);
    } else {
      throw new Error("Unable to get Twitter Profile");
    }
  }

  return {
    request_token,
    convert_token,
    get_profile
  };
})();

module.exports = twitter;
