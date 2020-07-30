import {combineReducers} from 'redux';
import '../index.css';

const currentLocation = {
    Name: "",
    Address: "",
    PlacesId: "",
    Area: "",
    Country: "",
    Info: {}
}



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


let userState = {
    "loginStatus": false,
    "name": null,
    "email": null,
    "profilePic": null,
    // "id": null,
    "visited": null,
    "itineraries": null
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




const locationsReducer = (locations = [], action) => {
    if (action.type === "NEW_LOCATION"){
        let newLocation = action.payload;
        return locations.concat(newLocation);
    }
    else if (action.type === "DEL_LOCATION"){
        let newArray = locations.slice();
        let indexToRemove = newArray.findIndex((item) => {
           return action.location_id === item.id;
        });
        newArray.splice(indexToRemove, 1);
        return newArray;
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
    else if (action.type === "ADD_PHOTOS"){
        let photos = action.add.files;
        let index = action.add.index;
        console.log(index);
        console.log(locations[index]);
        locations[index].userPhotos.push(photos);
        return locations;
    }


    return locations;
};


const cityReducer = (cities = [], action) =>{
    if (action.type === 'CHANGE_DATE_CITY'){
        let newArray = cities.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        newArray[indexToChange].dateRanges[action.dateIndex].value = action.date;
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
        let date = {value: action.value};
        newArray[indexToChange].dateRanges = newArray[indexToChange].dateRanges.concat(date);
        return newArray
    }
    else if (action.type === "RENDER_CITY"){
        return action.payload;
    }
    return cities;
};

const countryReducer = (countries = [], action) =>{
    if (action.type === 'CHANGE_DATE_COUNTRY'){
        let newArray = countries.slice();
        let indexToChange = newArray.findIndex((item) => {
            return action.place.id === item.id;
        });
        newArray[indexToChange].dateRanges[action.dateIndex].value = action.date;
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
        let date = {value: action.value};
        newArray[indexToChange].dateRanges = newArray[indexToChange].dateRanges.concat(date);
        console.log(newArray[indexToChange].dateRanges)
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

const itineraryReducer = (itinerary = { name: "", dateRanges : [{start: "2020/08/20", end: "2020/08/28"} ]}, action) =>{
    if (action.type === "NAME_CHANGE"){
        return{
            ...itinerary,
            name: action.name
        };
    }
    else if (action.type === 'CHANGE_DATE_ITINERARY'){
        let newArray = itinerary.dateRanges.slice();
        newArray[action.dateIndex].value = action.date;
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
        let date = {value: action.value};
        newArray = newArray.concat(date);
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
    msgId: selector,
    currentItinerary: currentItineraryReducer,
    currentItineraryID: currentItineraryObjectIDReducer,
    authentication: authenticationReducer,
    currentUserProfile: currentUserProfileReducer
});
