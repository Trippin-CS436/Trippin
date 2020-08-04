import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
                <Switch>
                <Route path="/shared/:id" component={SharePage} />
                {/*<AuthRoute path="/" />*/}
                <AuthRoute path="/userprofile">
                    <ProfilePageLinh />
                </AuthRoute>
                <AuthRoute path="/itineraries/:id" component={Itineraries} />
                <Route path="/login">
                    <Login />
                </Route>
                <AuthRoute path="/map">
                    <Map />
                </AuthRoute>
                <AuthRoute path="/lists">
                    <Lists />
                </AuthRoute>
                <AuthRoute path="/test">
                    <Itinerary />
                </AuthRoute>
                </Switch>
            </div>
        </Router>
    );
}

export default App;