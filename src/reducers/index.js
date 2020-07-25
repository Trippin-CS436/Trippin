import {combineReducers} from 'redux';
import React from 'react';
import '../index.css';

const currentLocation = {
    Name: "",
    Address: "",
    PlacesId: "ChIJK7VbnXxxhlQRCbKQyeRwBJ4",
    Area: "",
    Country: "",
    Info: {}
}


/*** Handles all changes to current location
 * params =
 *      currentLocation - currentLocation selected in the itinerary list for editting
 *       action - valid actions are addNotes
 *              - (should also be able to have a setCurrentLocation that changes current location when selected) ***/
const currentLocationReducer = (currentLocation = {name: "", address: "", info: {}, notes: ""}, action) => {
    if (action.type === 'ADD_NOTES') {
        // change the notes of current location to the action.text
        console.log(action.text + "hereherehhere");
        currentLocation.notes = action.text;
        console.log(JSON.stringify(currentLocation));
        return currentLocation;
    }
    return currentLocation;
};



const mapLocationReducer = (state = currentLocation, action) => {
    switch(action.type) {
        case 'GET_LOCATION':
            return {
                ...state,
                Name: action.payload.placeName,
                Address: action.payload.fulladdress,
                PlacesId: action.payload.placeId,
                Info: action.payload.info,
                Area: action.payload.placeArea,
                Country: action.payload.placeCountry
            }

        default:
            return state;
    }
};

let jsonObj = [{
    "listId": 0,
    "listName": "Visited Countries/Cities",
    "countryList": [
        {
            "id": 199,
            "name": "Singapore",
            "iso3": "SGP",
            "iso2": "SG",
            "phone_code": "65",
            "capital": "Singapur",
            "currency": "SGD",
            "states": [
                {
                    "id": 4651,
                    "name": "Central Singapore Community Development Council",
                    "state_code": "01",
                    "cities": [
                        {
                            "id": 104057,
                            "name": "Singapore",
                            "latitude": "1.28967000",
                            "longitude": "103.85007000"
                        }
                    ]
                },
                {
                    "id": 4649,
                    "name": "North East Community Development Council",
                    "state_code": "02",
                    "cities": []
                },
                {
                    "id": 4653,
                    "name": "North West Community Development Council",
                    "state_code": "03",
                    "cities": [
                        {
                            "id": 104058,
                            "name": "Woodlands",
                            "latitude": "1.43801000",
                            "longitude": "103.78877000"
                        }
                    ]
                },
                {
                    "id": 4650,
                    "name": "South East Community Development Council",
                    "state_code": "04",
                    "cities": []
                },
                {
                    "id": 4652,
                    "name": "South West Community Development Council",
                    "state_code": "05",
                    "cities": []
                }
            ]
        }]
},
    {
        "listId": 1,
        "listName": "Wishlist!",
        "countryList": []
    },

];

let userState = {
    "loginStatus": false,
    "name": null,
    "email": null,
    "profilePic": null,
    // "id": null,
    "visited": null,
    "itineraries": null
};

const listReducer = (lists = jsonObj, action) => {
    if (action.type === 'ADD_MSG') {
        return [...lists, action.addMsg];
    }
    if (action.type === 'DELETE_MSG') {
        return lists.filter((item, index) => index !== action.deleteMsg);
    }
    return lists;
};

const selector = (msgId = 0, action) => {
    if (action.type == 'SELECT_MSG') {
        return action.selectMsg;
    }
    return msgId;
};

const authenticationReducer = (authentication = userState, action) => {
    if (action.type === "LOGOUT") {
            let newAuth = {
                "loginStatus": false,
                "name": null,
                "email": null,
                "profilePic": null,
               // "id": null,
                "visited": null,
                "itineraries": null
            };
            return newAuth;
    }
    if (action.type === "LOGIN") {
        let newAuth = {
            loginStatus: true,
            name: action.logIn.name,
            email: action.logIn.email,
            profilePic: action.logIn.profilePic,
           // id: action.logIn._id,
            visited: action.logIn.visited,
            itineraries: action.logIn.itineraries
        };
        return newAuth;
    }
    return authentication;
};




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA





const defaultLocations = [{id:0, location: "Rogers Arena", address: "800 Griffiths Way, Vancouver, BC V6B 6G1", cityID: 0, notes: "", info: {}},
    {id:1, location: "Playland", address: "2901 E Hastings St, Vancouver, BC V5K 5J1", cityID: 0, notes: "", info: {}},
    {id:2, location: "Science World", address: "1455 Quebec St, Vancouver, BC V6A 3Z7", cityID: 0, notes: "", info: {}},
    {id:3, location: "Stanley Park", address: " Vancouver, BC V6G 1Z4", cityID: 0, note: "", info: {}},
    {id:4, location: "Capilano Suspension Bridge", address: "3735 Capilano Rd, North Vancouver, BC V7R 4J1", cityID: 0, notes: "", info: {}},
    {id:6, location: "Craigdarroch Castle", address: "1050 Joan Crescent, Victoria, BC V8S 3L5", cityID: 2, notes: "", info: {}},
    {id:7, location: "Alcatraz Island", address: "San Francisco, CA 94133, United States", cityID: 1, notes: "", info: {}},];

const locationsReducer = (locations = defaultLocations, action) => {
    if (action.type === "ADD_LOCATION"){
        let newArray = locations.slice();
        newArray.push(action.add);
        console.log("newArray: ", newArray);
        return newArray;
    }
    else if (action.type === "DEL_LOCATION"){
        let newArray = locations.slice();
        let indexToRemove = newArray.findIndex((item) => {
           return action.location_id === item.id;
        });
        newArray.splice(indexToRemove, 1);
        return newArray;
    }
    else if (action.type === "NEW_LOCATION"){
        let newLocation = {
            id: action.location_id,
            location: action.location_name,
            address: action.location_address,
            cityID: action.cityID,
            notes: "",
            info: {},
        };
        return locations.concat(newLocation);
    }
    else if (action.type === "RENDER_LOCATION"){
        return action.payload;
    }
    else if (action.type === "ADD_NOTES"){
        let notes = action.add.notes;
        let index = action.add.index;
        console.log(index);
        console.log(locations[index]);
        locations[index].notes = notes;
        return locations;
    }


    return locations;
};

const defaultCities = [{name: "Vancouver", id: 0, countryID: 0, dateRanges : [{start: "2020/08/20", end: "2020/08/21"}, {start: "2020/08/20", end: "2020/08/21"}]},
    {name: "San Francisco", id: 1, countryID: 1, dateRanges : [{start: "2020/08/21", end: "2020/08/22"}]},
    {name: "Victoria", id: 2, countryID: 0, dateRanges : [{start: "2020/08/22", end: "2020/08/23"}]}];
const cityReducer = (cities = defaultCities, action) =>{
    if (action.type === 'START_DATE_CHANGE_CITY'){
        let newArray = cities.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        newArray[indexToChange].dateRanges[action.dateIndex].start = action.date;
        return newArray
    }
    else if (action.type === 'END_DATE_CHANGE_CITY'){
        let newArray = cities.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        newArray[indexToChange].dateRanges[action.dateIndex].end = action.date;
        return newArray
    }
    else if (action.type === "NEW_CITY"){
        let city = {
            name: action.name,
            id: action.id,
            dateRanges: [],
            countryID: action.countryID,
        };
        return cities.concat(city);
    }
    else if (action.type ==="DEL_CITY"){
        let newArray = cities.slice();
        let indexToRemove = newArray.findIndex((item) => {
            return action.location_id === item.id;
        });
        newArray.splice(indexToRemove, 1);
        return newArray;
    }
    else if (action.type === 'DELETE_DATE_CITY'){
        let newArray = cities.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        newArray[indexToChange].dateRanges.splice(action.dateIndex,1);
        return newArray
    }
    else if (action.type === 'NEW_DATE_CITY'){
        let newArray = cities.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        let date = {start: action.start, end: action.end}
        newArray[indexToChange].dateRanges = newArray[indexToChange].dateRanges.concat(date);
        return newArray
    }
    else if (action.type === "RENDER_CITY"){
        return action.payload;
    }
    return cities;
};


const defaultCountries = [{name: "Canada", id: 0, dateRanges : [{start: "2020/08/20", end: "2020/08/25"},{start: "2020/08/29", end: "2020/08/31"}]},
    {name: "United States", id: 1, dateRanges : [{start: "2020/08/25", end: "2020/08/28"}]}];
const countryReducer = (countries = defaultCountries, action) =>{
    if (action.type === 'START_DATE_CHANGE_COUNTRY'){
        let newArray = countries.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        newArray[indexToChange].dateRanges[action.dateIndex].start = action.date;
        return newArray
    }
    else if (action.type === 'END_DATE_CHANGE_COUNTRY'){
        let newArray = countries.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        newArray[indexToChange].dateRanges[action.dateIndex].end = action.date;
        return newArray
    }
    else if (action.type === "NEW_COUNTRY"){
        let country = {
            name: action.name,
            id: action.id,
            dateRanges: [],
        };
        return countries.concat(country);
    }
    else if (action.type ==="DEL_COUNTRY"){
        let newArray = countries.slice();
        let indexToRemove = newArray.findIndex((item) => {
            return action.location_id === item.id;
        });
        newArray.splice(indexToRemove, 1);
        return newArray;
    }
    else if (action.type === 'DELETE_DATE_COUNTRY'){
        let newArray = countries.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        newArray[indexToChange].dateRanges.splice(action.dateIndex,1);
        return newArray
    }
    else if (action.type === 'NEW_DATE_COUNTRY'){
        let newArray = countries.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        let date = {start: action.start, end: action.end}
        newArray[indexToChange].dateRanges = newArray[indexToChange].dateRanges.concat(date);
        return newArray
    }
    else if (action.type === "RENDER_COUNTRY"){
        return action.payload;
    }
    return countries;
};

const defaultView = {
    byID:{
        city: 0, //**** set to -1 if nothing to render
    }
};
const currentViewReducer = (currentView = defaultView, action) => {
   if(action.type === "CHANGE_VIEW"){
        return action.newView;
    }
    return currentView;
};

const itineraryReducer = (itinerary = { name: "Test itinerary", dateRanges : [{start: "2020/08/20", end: "2020/08/28"}]}, action) =>{
    if (action.type === "NAME_CHANGE"){
        return{
            ...itinerary,
            name: action.name
        };
    }
    else if (action.type === "ADD_LOCATION___NULL") {
        itinerary.push(action.add);
        return itinerary;
    }
    else if (action.type === 'START_DATE_CHANGE_ITINERARY'){
        let newArray = itinerary.dateRanges.slice();
        newArray[action.dateIndex].start = action.date;
        return{
            ...itinerary,
            dateRanges: newArray,
        };
    }
    else if (action.type === 'END_DATE_CHANGE_ITINERARY'){
        let newArray = itinerary.dateRanges.slice();
        newArray[action.dateIndex].end = action.date;
        return{
            ...itinerary,
            dateRanges: newArray,
        };
    }
    else if (action.type === 'DELETE_DATE_ITINERARY'){
        let newArray = itinerary.dateRanges.slice();
        newArray.splice(action.dateIndex,1);
        return {
            ...itinerary,
            dateRanges: newArray,
        }
    }
    else if (action.type === 'NEW_DATE_ITINERARY'){
        let newArray = [...itinerary.dateRanges];
        newArray = newArray.concat({start: action.start, end: action.end});
        return {
            ...itinerary,
            dateRanges: newArray,
        }
    }
    else if (action.type === "SET_ITINERARY"){
        return action.payload
    }
    return itinerary;
};

const currentItineraryReducer = (currentItinerary = null, action) => {
    if(action.type === "SAVE_ITINERARY") {
        return action.payload;
    }

    return currentItinerary;
}

const currentItineraryObjectIDReducer = (id = null, action) => {
    if(action.type === "GET_CURRENT_ITINERARY_ID") {
        return action.payload;
    }

    return id;
}



// -- Current User's information -- //
const currentUser = {
    profilePicture: "https://i.pinimg.com/474x/c4/c6/11/c4c611741a47f0237c7c035601243623--suits-usa-men-in-suits.jpg",
    emailAddress: "www.test@gmail.com",
    firstName: "Harvey",
    lastName: "Spectre",
}

const currentUserProfileReducer = (state = currentUser, action) => {
    if(action.type === "GET_CURRENT_USER_PROFILE") {
        return {
            ...state,
            profilePicture: action.payload.profilePicture,
            emailAddress: action.payload.emailAddress,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
        }
    }
    return state;
}

export default combineReducers({
    locations: locationsReducer,
    itinerary: itineraryReducer,
    currentView: currentViewReducer,
    cities: cityReducer,
    countries: countryReducer,
    mapLocation: mapLocationReducer,
    currentLocation: currentLocationReducer,
    lists: listReducer,
    msgId: selector,
    currentItinerary: currentItineraryReducer,
    currentItineraryID: currentItineraryObjectIDReducer,
    authentication: authenticationReducer,
    currentUserProfile: currentUserProfileReducer
});
