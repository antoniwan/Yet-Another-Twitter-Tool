import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import oauth from "./libs/oauth";

function Connector() {
  const [connectorIsLoading, setConnectionIsLoading] = useState(false);

  async function handleClick() {
    console.log("click!");
    setConnectionIsLoading(true);
    const token_object = await oauth.request_token();
    console.log(token_object);
    setConnectionIsLoading(false);
  }

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      disabled={connectorIsLoading}
    >
      {connectorIsLoading ? "Loading..." : "Connect your Twitter account!"}
    </Button>
  );
}
function App() {
  return (
    <div className="app">
      <Connector />
    </div>
  );
}

export default App;
