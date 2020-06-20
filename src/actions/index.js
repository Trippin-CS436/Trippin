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

export const itineraryNameChange = (name) => {
    return {
        type: 'NAME_CHANGE',
        name: name,
    };
};