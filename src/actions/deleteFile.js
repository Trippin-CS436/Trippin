export const deleteFile = payload => {
    return {
        type: 'DELETE_FILE',
        delete: payload
    };
};