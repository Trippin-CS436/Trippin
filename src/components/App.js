import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import Itineraries from "./Itineraries";

function App() {
    return (
        <Router>
            <div>
<<<<<<< HEAD
                {/*<Route exact path="./itineraries">*/}
=======
                <Route exact path="/itineraries">
>>>>>>> Styling, routing and organizing components. Also added Expandable/Collapsible component
                    <Itineraries />
<<<<<<< HEAD
                {/*</Route>*/}
                {/*<Route exact path="/">*/}
                {/*    <Home />*/}
                {/*</Route>*/}
=======
                </Route>
                <Route exact path="/">
                    <Map />
                </Route>
>>>>>>> Map Component
            </div>
        </Router>
    );
}

export default App;