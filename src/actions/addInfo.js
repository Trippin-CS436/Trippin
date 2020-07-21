export const addInfo = info => {
    console.log(info);
    return {
        type: 'ADD_INFO',
        info: info
    };
};