import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import ListUsers from "./Components/ListUsers";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path={"/"} component={NavBar} />
      <Route exact path={"/"} component={Login} />
      <Route exact path={"/users"} component={ListUsers} />
    </div>
  );
}

export default App;
