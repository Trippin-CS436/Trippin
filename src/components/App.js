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
import ProfilePageLinh from "./ProfilePageLinh";
import SharePage from "./SharePage";





function App() {
    return (
        <Router>
            <div>
                <AuthRoute exact path="/userprofile">
                    <ProfilePageLinh />
                </AuthRoute>
                <AuthRoute path="/itineraries/:id" component={Itineraries} />
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
                <Route path="/shared/:id" component={SharePage} />
            </div>
        </Router>
    );
}

export default App;