import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import oauth, { OauthContext } from "../libs/oauth";

function Connector({ auth }) {
  const dispatch = useContext(OauthContext);
  const { loading, authenticated } = auth;

  async function handleClick() {
    dispatch({ type: "REQUESTING_TOKEN" });
    const token_object = await oauth.request_token();
    dispatch({ type: "TOKEN_ACCEPTED", auth_info: token_object });
  }

  async function handleLogout() {
    dispatch({ type: "LOG_OUT" });
  }

  return (
    <div>
      {!authenticated ? (
        <Button variant="primary" onClick={handleClick} disabled={loading}>
          {loading ? "Loading..." : "Connect your Twitter account!"}
        </Button>
      ) : (
        <Button variant="secondary" onClick={handleLogout} disabled={loading}>
          {loading ? "Loading..." : "Log Out"}
        </Button>
      )}
    </div>
  );
}

export default Connector;
