import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import NewItineraries from "./NewItineraries";
import Itinerary from "./Itinerary";
import Login from "./Login";
import './fonts.css';
import AuthRoute from "./AuthRoute";
import Navbar from "./Navbar";
import Archive from "./ArchiveItineraries";
import ProfilePage from './ProfilePage';
import ProfilePageLinh from "./ProfilePageLinh";
import SharePage from "./SharePage";
import EditItineraries from "./EditItineraries";




function App() {
    return (
        <Router>
            <div>
                <AuthRoute exact path="/userprofile">
                    <ProfilePageLinh />
                </AuthRoute>
                <AuthRoute path="/itineraries/:id" component={EditItineraries} />
                <AuthRoute exact path="/">
                    <Home />
                </AuthRoute>
                <AuthRoute exact path="/archive">
                    <Archive />
                </AuthRoute>
                <AuthRoute exact path="/itineraries">
                    <NewItineraries />
                </AuthRoute>
                <AuthRoute exact path="/login">
                    <Login />
                </AuthRoute>
                <Route exact path="/map">
                    <Map />
                </Route>
                <AuthRoute exact path="/test">
                    <Itinerary />
                </AuthRoute>
                <Route exact path="/shared/:id" component={SharePage} />
            </div>
        </Router>
    );
}

export default App;