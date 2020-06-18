import React from 'react';
import './App.css';
import './../assets/fonts.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import Itineraries from "./Itineraries";


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
            </div>
        </Router>
        
    );
}

export default App;