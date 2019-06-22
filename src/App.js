import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Connector() {
  const [connectorIsLoading, setConnectionIsLoading] = useState(false);

  function handleClick() {
    console.log("click!");
    setConnectionIsLoading(true);
    axios({
      method: "get",
      url: "/api/oauth/twitter"
    });
    axios
      .get("/api/oauth/twitter")
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
        }
      })
      .catch(function(error) {
        console.error(error);
      })
      .finally(function() {
        // always executed
      });
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
