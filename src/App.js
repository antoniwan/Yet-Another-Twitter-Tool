import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function Connector() {
  const [connectorIsLoading, setConnectionIsLoading] = useState(false);

  function handleClick() {
    console.log("click!");
    setConnectionIsLoading(true);
  }

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      disabled={connectorIsLoading}
    >
      {connectorIsLoading ? "Loading..." : "Connect with Twitter"}
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
