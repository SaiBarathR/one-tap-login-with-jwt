import jwt_decode from "jwt-decode";

const isJwtTokenExpired = () => {
    let isExpired = false;
    let decodedToken: any;
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
    return sessionStorage.getItem('token');
};

const setAuthToken = (token,type) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('signInType', type);
};

const removeAuthToken = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('signInType')
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
