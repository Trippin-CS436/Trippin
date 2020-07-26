import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import Itineraries from "./Itineraries";
import Itinerary from "./Itinerary";
import Lists from "./Lists";
import Login from "./Login";
import './fonts.css';
import AuthRoute from "./AuthRoute";
import Navbar from "./Navbar";
import ProfilePage from './ProfilePage';





function App() {
    return (
        <Router>
            <Navbar/>
            <div>
                <Route exact path="/itineraries">
                    <Itineraries />
                </Route>
               
            </div>
        </Router>
    );
}

export default App;