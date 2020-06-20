import {combineReducers} from 'redux';

const defaultLocations = [{id:0, location: "Rogers Arena", address: "800 Griffiths Way, Vancouver, BC V6B 6G1", cityID: 0},
    {id:1, location: "Playland", address: "2901 E Hastings St, Vancouver, BC V5K 5J1", cityID: 0},
    {id:2, location: "Science World", address: "1455 Quebec St, Vancouver, BC V6A 3Z7", cityID: 0},
    {id:3, location: "Stanley Park", address: " Vancouver, BC V6G 1Z4", cityID: 0},
    {id:4, location: "Capilano Suspension Bridge", address: "3735 Capilano Rd, North Vancouver, BC V7R 4J1", cityID: 0},
    {id:5, location: "SHOULD NOT RENDER THIS LOCATION", address: "3735 Capilano Rd, North Vancouver, BC V7R 4J1", cityID: 0}];

const locationsReducer = (locations = defaultLocations, action) => {
    if (action.type === "DEL_LOCATION"){
        let newArray = locations.slice();
        newArray.splice(action.location_index, 1);
        return newArray;
    }
    return locations;
};

const defaultCities = [{name: "Vancouver", id: 0, countryID: 0, dateRanges : ["2020/08/20 - 2020/08/22"]},
    {name: "San Francisco", id: 1, countryID: 1, dateRanges : ["2020/08/20 - 2020/08/22"]}];
const cityReducer = (cities = defaultCities, action) =>{

    return cities;
};


const defaultCountries = [{name: "Canada", id: 0, dateRanges : ["2020/08/20 - 2020/08/22"]},
    {name: "United States", id: 1, dateRanges : ["2020/08/20 - 2020/08/22"]}];
const countryReducer = (countries = defaultCountries, action) =>{

    return countries;
};

const defaultView = {
    byID:{
        country: 0,
        city: 0,
        locations: [0,1,2,3,4],
    }
};
const currentViewReducer = (currentView = defaultView, action) => {
    if (action.type === "DEL_LOCATION"){
        let newArray = currentView.byID.locations.slice();
        newArray.splice(action.location_index, 1);
        return {
            ...currentView,
            byID: {
                ...currentView.byID,
                locations: newArray,
            }
        };
    }
    return currentView;
};

const itineraryReducer = (itinerary = {name: "Test itinerary", dateRanges : ["2020/08/20 - 2020/08/22"]}, action) =>{
    if (action.type === "NAME_CHANGE"){
        return{
            ...itinerary,
            name: action.name
        };
    }
    return itinerary;
};
export default combineReducers({
    locations: locationsReducer,
    itinerary: itineraryReducer,
    currentView: currentViewReducer,
    cities: cityReducer,
    countries: countryReducer,
});