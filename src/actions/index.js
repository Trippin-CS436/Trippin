export const addMsg = msg => {
    return {
        type: 'ADD_MSG',
        addMsg: msg
    };
};

export const selectMsg = msgId => {
    return {
        type: 'SELECT_MSG',
        selectMsg: msgId
    }

};

export const deleteMsg = msgId => {
    return {
        type: 'DELETE_MSG',
        deleteMsg: msgId
    }
};

export const chooseUser = userName => {
    return {
        type: 'CHOOSE_USER',
        chooseUser: userName
    }
};

export const deleteLocation = (idx) => {
    return {
        type: 'DEL_LOCATION',
        location_index: idx,
    };
};

export const changeView = (country,city,locations) => {
    let cityLocationsID = locations.filter((location)=>{
        return location.cityID == city.id;
    }).map((location) => {
        return location.id;
    });

    let view = {
        byID: {
            country: country.id,
            city: city.id,
            locations: cityLocationsID,
        }
    };
    return {
        type: 'CHANGE_VIEW',
        newView: view,
    };
};

export const itineraryNameChange = (name) => {
    return {
        type: 'NAME_CHANGE',
        name: name,
    };
};