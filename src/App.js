import React, { useReducer } from "react";
import { OauthContext } from "./libs/oauth";
import Connector from "./components/Connector";
import authReducer from "./reducers/authreducer";

function App() {
  const [auth, dispatchAuth] = useReducer(authReducer, {
    authenticated: null,
    loading: false
  });
  const { loading, authenticated } = auth;

  console.log("auth", auth);

  return (
    <div className="app">
      <OauthContext.Provider value={dispatchAuth}>
        {!authenticated && <Connector auth={auth} />}
      </OauthContext.Provider>
    </div>
  );
}

export default App;
