import {combineReducers} from 'redux';

const defaultLocations = [{location: "Roger's Arena", address: "800 Griffiths Way, Vancouver, BC V6B 6G1"},
    {location: "Playland", address: "2901 E Hastings St, Vancouver, BC V5K 5J1"},
    {location: "Science World", address: "1455 Quebec St, Vancouver, BC V6A 3Z7"},
    {location: "Stanley Park", address: " Vancouver, BC V6G 1Z4"},
    {location: "Capilano Suspension Bridge", address: "3735 Capilano Rd, North Vancouver, BC V7R 4J1"}];

const locationsReducer = (locations = defaultLocations, action) => {
    if (action.type === "DEL_LOCATION"){
        console.log(action.index);
        let newArray = locations.slice();
        newArray.splice(action.index, 1);
        return newArray;
    }
    return locations;
};

export default combineReducers({
    locations: locationsReducer,
});