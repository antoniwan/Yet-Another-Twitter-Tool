import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Home from "./containers/Home";
import Dashboard from "./containers/Dashboard";
import ValidateUser from "./containers/ValidateUser";
import { OauthContext } from "./libs/oauth";
import Connector from "./components/Connector";
import authReducer from "./reducers/authreducer";

function App() {
  const [auth, dispatchAuth] = useReducer(
    authReducer,
    JSON.parse(localStorage.getItem("authState")) || {
      authenticated: null,
      loading: false
    }
  );
  const { authenticated } = auth;

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(auth));
  });
  return (
    <div className="app">
      <OauthContext.Provider value={dispatchAuth}>
        {!authenticated && <Connector auth={auth} />}

        <Router>
          {!authenticated && (
            <Route path="/oauth/callback/twitter" component={ValidateUser} />
          )}
          {authenticated && <Redirect to="/dashboard" />}
          <Route
            exact
            path="/dashboard"
            render={props => <Dashboard {...props} authState={auth} />}
          />
        </Router>
      </OauthContext.Provider>
    </div>
  );
}

export default App;
