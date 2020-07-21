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

export const logInOut = boolean => {
    return {
        type: 'LOGIN_OUT',
        logInOut: boolean
    }
};

export const setUser = nameEmailObj => {
    return {
        type: 'SET_NAME_EMAIL',
        setUser: nameEmailObj
    }
}

