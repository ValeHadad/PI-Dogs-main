import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import "./App.css";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/create" component={Form} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route path="/home">
          <NavBar /> {/* NavBar solo en la página Home */}
          <Home />
        </Route>
      </div>
    </Router>
  );
}

export default App;
