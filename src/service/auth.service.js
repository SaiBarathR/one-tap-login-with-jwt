import jwt_decode from "jwt-decode";

const isJwtTokenExpired = () => {
    let isExpired = false;
    let decodedToken = null;
    const token = getAuthToken();
    try {
        if (token !== null && token !== '') {
            decodedToken = jwt_decode(token);
            const dateNow = new Date();
            if (decodedToken.exp * 1000 < dateNow.getTime()) {
                isExpired = true;
            } else {
                isExpired = false;
            }
            return isExpired;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

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
    return (token && !isJwtTokenExpired()) ? true : false;
}

export const AuthServices = {
    isJwtTokenExpired,
    getAuthToken,
    setAuthToken,
    removeAuthToken,
    authUser,
}
