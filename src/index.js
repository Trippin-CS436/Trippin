import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {userIsAuthenticated, userIsNotAuthenticated} from "./auth.js";
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import reducers from './reducers';
import Itineraries from "./components/Itineraries";
import Home from "./components/Home";
import Login from "./components/Login";
import Map from "./components/Map";
import Lists from "./components/Lists";
import Itinerary from "./components/Itinerary";
 import {BrowserRouter as Router} from "react-router-dom";
import { Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import App from "./components/App";

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    })
);
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}>
                <Route exact path="/itineraries" component={userIsAuthenticated(Itineraries)}/>
                <Route exact path="/" component={userIsAuthenticated(Home)}/>
                <Route exact path="/login" component={userIsNotAuthenticated(Login)}/>
                <Route exact path="/map" component={userIsAuthenticated(Map)}/>
                <Route exact path="/lists" component={userIsAuthenticated(Lists)}/>
                <Route exact path="/test" component={userIsAuthenticated(Itinerary)}/>
            </Route>
        </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
