import { createContext } from "react";

const oauth = (function() {
  async function oauth_twitter_request_token() {
    let response = await fetch("/api/oauth/twitter/request_token");
    if (response.ok) {
      return response.json();
    }
    return false;
  }

  return {
    request_token: oauth_twitter_request_token
  };
})();

const OauthContext = createContext(null);

export default oauth;
export { OauthContext };
