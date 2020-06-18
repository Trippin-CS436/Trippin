export const addNotes = text => {
    console.log(text);
    return {
        type: 'ADD_NOTES',
        text: text
    };
};