import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import oauth, { OauthContext } from "../libs/oauth";

function Connector({ auth }) {
  const dispatch = useContext(OauthContext);
  const { loading, redirecting } = auth;

  const handleClick = async () => {
    dispatch({ type: "REQUESTING_TOKEN" });
    const token_object = await oauth.request_token();
    await dispatch({ type: "TOKEN_ACCEPTED", token_info: token_object });
    window.location = `https://api.twitter.com/oauth/authorize?oauth_token=${
      token_object.oauth_token
    }`;
  };

  let cta_string = "Connect your Twitter account!";
  if (redirecting) {
    cta_string = "Redirecting...";
  }

  if (loading) {
    cta_string = "Loading...";
  }

  useEffect(() => {
    console.log("Connected loaded...");
  });

  return (
    <div>
      <Button variant="primary" onClick={handleClick} disabled={loading}>
        {cta_string}
      </Button>
    </div>
  );
}

export default Connector;
