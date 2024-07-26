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
    const isAuth = (token !== null && token !== undefined) ? true : false;
    console.log('isAuth', isAuth)
    return isAuth;
}

export const AuthServices = {
    getAuthToken,
    setAuthToken,
    removeAuthToken,
    authUser,
}
