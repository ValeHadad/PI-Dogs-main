import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home">
            <NavBar /> {/* NavBar solo en la página Home */}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


