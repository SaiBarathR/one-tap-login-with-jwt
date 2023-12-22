import { AuthServices } from "./auth.service";

const SignInService = (function () {
    let service = {};
    const baseUrl = 'http://localhost:8080/api';
    let headers = { 'Content-Type': 'application/json', }
    const urlList = {
        signUp: baseUrl + '/auth/signup',
        signIn: baseUrl + '/auth/signin',
        googleSignIn: baseUrl + '/auth/googleSignIn',
    }

    service.handleBothSignInSignUp = function (data, type = 'signIn') {
        return fetch(urlList[type], {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        }).then(response => {
            return response.json() || response || "No response";
        }).catch((error) => {
            return error;
        });
    }

    service.googleSignIn = function (data) {
        return fetch(urlList['googleSignIn'], {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        }).then(response => {
            return response.json() || response || "No response";
        }).catch((error) => {
            return error;
        });
    }

    service.registerOrLoginUser = async (isNewUser, userInfo, navigateTo) => {
        const type = isNewUser ? "signUp" : "signIn";
        try {
            const response = await SignInService.handleBothSignInSignUp(userInfo, type);
            if (response.status === "success") {
                AuthServices.setAuthToken(response.accessToken, 'manual');
                localStorage.setItem('email', response.email);
                navigateTo('/home');
            }
            else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    service.handleGoogleSignIn = async (code, navigateTo) => {
        try {
            const response = await SignInService.googleSignIn({ code: code });
            if (response.status === "success") {
                AuthServices.setAuthToken(response.accessToken, 'google');
                localStorage.setItem('email', response.email);
                navigateTo('/home');
            } else {
                alert(response.message);
                AuthServices.removeAuthToken();
            }
        } catch (error) {
            AuthServices.removeAuthToken();
        }
    }

    service.facebookLogin = (navigateTo) => {
        window.FB.login(function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded, got access token: ', response.authResponse);
                if (response.status === 'connected') {
                    AuthServices.setAuthToken(response.authResponse.accessToken, 'facebook');
                    navigateTo('/home');
                    return
                }
                console.error('Facebook login failed, no access token: ', response);
            } else {
                console.error('Facebook login failed, response: ', response);
            }
        }, { scope: 'public_profile,email,user_birthday,user_gender' });
    }

    return service;
}());

export default SignInService;