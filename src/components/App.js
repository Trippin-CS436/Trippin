import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import Itineraries from "./Itineraries";
import Itinerary from "./Itinerary";
import Lists from "./Lists";
import Login from "./Login";
import './fonts.css';
import AuthRoute from "./AuthRoute";
import Navbar from "./Navbar";


function App() {
    return (
        <Router>
            <Navbar/>
            <div>
                <AuthRoute exact path="/itineraries">
                    <Itineraries />
                </AuthRoute>
                <AuthRoute exact path="/">
                    <Home />
                </AuthRoute>
                <Route exact path="/login">
                    <Login />
                </Route>
                <AuthRoute exact path="/map">
                    <Map />
                </AuthRoute>
                <AuthRoute exact path="/lists">
                    <Lists />
                </AuthRoute>
                <AuthRoute exact path="/test">
                    <Itinerary />
                </AuthRoute>
            </div>
        </Router>
    );
}


export default App;