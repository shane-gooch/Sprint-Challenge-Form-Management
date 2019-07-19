import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import "./App.css";

import { useLocalStorage } from "./hooks/useLocalStorage";
import AddNewUser from "./components/AddNewUser";
import Restricted from "./components/Restricted";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useLocalStorage("token");

  return (
    <div className="App">
      <Link to="/">Add New user</Link>
      <Link to="/login">Login</Link>
      <Link to="/restricted">Restricted</Link>

      <Route
        exact
        path="/"
        render={props => <AddNewUser {...props} setToken={setToken} />}
      />
      <Route
        path="/login"
        render={props => <Login {...props} setToken={setToken} />}
      />
      <Route
        path="/restricted"
        render={props => {
          const token = localStorage.getItem("token");
          if (!token) {
            return <Redirect to="/login" />;
          }
          return <Restricted {...props} />;
        }}
      />
    </div>
  );
}

export default App;
