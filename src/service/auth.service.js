const getAuthToken = () => {
    return localStorage.getItem('token');
};

const setAuthToken = (token, type) => {
    localStorage.setItem('token', token);
    localStorage.setItem('signInType', type);
};

const removeAuthToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('signInType')
}

const authUser = () => {
    const token = getAuthToken();
    return (token === "true" || token === true)
}

export const AuthServices = {
    getAuthToken,
    setAuthToken,
    removeAuthToken,
    authUser,
}
