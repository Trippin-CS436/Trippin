import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Map from "./Map";
import NewItineraries from "./NewItineraries";
import Itinerary from "./Itinerary";
import Login from "./Login";
import './fonts.css';
import AuthRoute from "./AuthRoute";
import Archive from "./ArchiveItineraries";
import ProfilePageLinh from "./ProfilePageLinh";
import SharePage from "./SharePage";
import EditItineraries from "./EditItineraries";
import NotFound from "./NotFound";
import BrowseItineraries from "./BrowseItineraries";





function App() {
    return (
        <Router>
            <div>
                <Switch>
                <Route path="/shared/:id" component={SharePage} />
                <AuthRoute path="/userprofile">
                    <ProfilePageLinh />
                </AuthRoute>
                <AuthRoute exact path="/">
                     <Redirect to={"/userprofile"} />
                </AuthRoute>
                <AuthRoute path="/itineraries/:id" component={EditItineraries} />
                <AuthRoute exact path="/archive">
                    <Archive />
                </AuthRoute>
                <AuthRoute exact path="/browse">
                    <BrowseItineraries />
                </AuthRoute>
                <AuthRoute exact path="/itineraries">
                    <NewItineraries />
                </AuthRoute>
                <Route path="/login">
                    <Login />
                </Route>
                <AuthRoute path="/map">
                    <Map />
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