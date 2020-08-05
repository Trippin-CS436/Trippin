import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
import NotFound from "./NotFound";





function App() {
    return (
        <Router>
            <div>
                <Switch>
                <Route path="/shared/:id" component={SharePage} />
                <AuthRoute exact path="/" />
                <AuthRoute path="/userprofile">
                    <ProfilePageLinh />
                </AuthRoute>
                <AuthRoute path="/itineraries/:id" component={EditItineraries} />
                <AuthRoute exact path="/archive">
                    <Archive />
                </AuthRoute>
                <AuthRoute exact path="/itineraries">
                    <NewItineraries />
                </AuthRoute>
                <AuthRoute exact path="/login">
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
                <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;