import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import Itineraries from "./Itineraries";
import Itinerary from "./Itinerary";
import Lists from "./Lists";
import './fonts.css';

function App() {
    return (
        <Router>
            <div>
                <Route exact path="/itineraries">
                    <Itineraries />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/map">
                    <Map />
                </Route>
                <Route exact path="/lists">
                    <Lists />
                </Route>
                <Route exact path="/test">
                    <Itinerary />
                </Route>
            </div>
        </Router>
    );
}

export default App;