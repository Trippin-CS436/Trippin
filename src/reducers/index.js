import {combineReducers} from 'redux';
import '../index.css';

const defaultMapLocation = {
    Name: "",
    Address: "",
    PlacesId: "",
    Area: "",
    Country: "",
    Info: {}
}



const mapLocationReducer = (state = defaultMapLocation, action) => {
    switch(action.type) {
        case 'GET_LOCATION':
            return {
                ...state,
                Name: action.payload.placeName,
                Address: action.payload.fulladdress,
                PlacesId: action.payload.placeId,
                Info: action.payload.info,
                Area: action.payload.placeArea,
                Country: action.payload.placeCountry,
                lat: action.payload.lat,
                lon: action.payload.lon,
            }
        case 'RESET':
            return defaultMapLocation;
        case 'RESET_MAP':
            return defaultMapLocation;
        default:
            return state;
    }
};


let userState = {
    "isGoogle": null,
    "loginStatus": false,
    "name": null,
    "email": null,
    "profilePic": null,
    "id": null,
    "visited": [],
    "itineraries": [],
    "archived": []
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
                "isGoogle": null,
                "loginStatus": false,
                "name": null,
                "email": null,
                "profilePic": null,
               "id": null,
                "visited": null,
                "itineraries": null,
                "archived": null,
                "profilePageItineraries": null
            };
            return newAuth;
    }
    if (action.type === "LOGIN") {
        let newAuth = {
            loginStatus: true,
            isGoogle: action.logIn.isGoogle,
            name: action.logIn.name,
            email: action.logIn.email,
            profilePic: action.logIn.profilePic,
            id: action.logIn.id,
            visited: action.logIn.visited,
            itineraries: action.logIn.itineraries,
            archived: action.logIn.archived,
            profilePageItineraries: []
        };
        return newAuth;
    } else if (action.type === "UPDATE_ARCHIVE") {
        let newAuth = {
           ...authentication,
           archived: action.payload.archived,
           itineraries: action.payload.itineraries,
           profilePageItineraries: action.payload.profilePageItineraries
        };
        return newAuth;
    }
    if (action.type === "UPDATE_USER_ITINERARY") {
        let newAuth = {
            ...authentication,
            itineraries: action.updateUserItinerary,
        };
        return newAuth;
    }
    if (action.type === "UPDATE_VISITED"){
        let newAuth = {
            ...authentication,
            visited: action.payload.visited,
        }
        return newAuth
    }
    return authentication;
};

const copyObj = {
    countries: [],
    cities: [],
    locations: []
}

const copyItineraryReducer = (copy = copyObj, action) => {
    if (action.type === 'COPY_ITINERARY') {
        let newCopy = {
            countries: action.copyArchived.countries,
            cities: action.copyArchived.cities,
            locations: action.copyArchived.locations
        };
        return newCopy
    }
    if (action.type === 'RESET_COPY_ITINERARY') {
        let newCopy = {
            countries: [],
            cities: [],
            locations: []
        };
        return newCopy
    }
    return copy;
}




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
        locations[index].notes = notes;
        return locations;
    }
    else if (action.type === "ADD_PHOTOS"){
        let photos = action.add.photoFiles; // array of files to add
        let index = action.add.index;
        function add(photo) {
            locations[index].userPhotos.push(photo);
        }
        photos.forEach(add);
        return locations;
    } else if (action.type === 'DELETE_PHOTO') {
        let imgIndex = action.delete.imgIndex;
        let locID = action.delete.locID;
        let newArray = locations.slice();
        let locIndex = newArray.findIndex((item) => {
           return locID === item.id;
        });
        let newPhotos = locations[locIndex].userPhotos;
        newPhotos.splice(imgIndex, 1);
        locations[locIndex].userPhotos = newPhotos;
        console.log('Reducer location Remove Photo: ', locations);
        let testArray = locations.slice();
        return testArray; 
    } else if (action.type === "RESET"){
        let locations = [];
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
    else if (action.type === 'RESET'){
        let newCities = [];
        return newCities;
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
        return newArray
    }
    else if (action.type === "RENDER_COUNTRY"){
        return action.payload;
    } else if (action.type === 'RESET'){
        let newCities = [];
        return newCities;
    }
    return countries;
};

const defaultView = {
    byID:{
        city: -1, //**** set to -1 if nothing to render
    }
};
const currentViewReducer = (currentView = defaultView, action) => {
   if(action.type === "CHANGE_VIEW"){
        return action.newView;
    }
    if(action.type === 'RESET'){
        return {
            byID: {
                city: -1
            }
        }
    }
    return currentView;
};


let itineraryReducer = (itinerary = { name: "Enter Name of Itinerary", dateRanges : [], files: [], shared: false, rating: 0, tags:[]}, action) =>{
    if (action.type === "NAME_CHANGE"){
        return{
            ...itinerary,
            name: action.name
        };
    } else if (action.type === "UPDATE_SHARE"){
        return{
            ...itinerary,
            shared: action.payload
        }
    } else if (action.type === 'ADD_FILES'){
        let newFiles = action.add;
        let oldFiles = itinerary.files !== undefined ? itinerary.files : [];
        function add(file) {
            oldFiles.push(file);
        }
        newFiles.forEach(add);
        itinerary.files = oldFiles;
        return itinerary;
        
    } else if (action.type === 'DELETE_FILE'){
        let file = action.delete;
        let oldFiles = itinerary.files !== undefined ? itinerary.files : [];
        let index = oldFiles.findIndex((item) => {
            return file.id === item.id;
         });
        oldFiles.splice(index, 1);
        itinerary.files = oldFiles;
        let newItinerary = itinerary;
        newItinerary.files = oldFiles;
        return newItinerary;
    }
    else if (action.type === 'RESET'){
        let today = new Date();
        let tomorrow = new Date();
        let newItinerary = { name: "New Itinerary", dateRanges :  [{value: [today, tomorrow]}], files: [], shared: false, rating: 0, tags:[]};
        return newItinerary;
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
    } else if(action.type === 'RESET') {
        let newCurrentItinerary = null;
        return newCurrentItinerary;
    }

    return currentItinerary;
}

const editItineraryIDReducer = (id = null, action) => {
    if(action.type === "EDIT_ITINERARY") {
        return action.edit;
    }  return id;
}

const currentItineraryObjectIDReducer = (id = null, action) => {
    if(action.type === "GET_CURRENT_ITINERARY_ID") {
        return action.payload;
    } else if(action.type === 'RESET') {
        let newCurrentItinerary = null;
        return newCurrentItinerary;
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
    currentUserProfile: currentUserProfileReducer,
    editItineraryID: editItineraryIDReducer,
    copyItinerary: copyItineraryReducer
});
