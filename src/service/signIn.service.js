import { urls } from "../config";
import { AuthServices } from "./auth.service";

const SignInService = (function () {
    let service = {};
    const baseUrl = urls.baseURL;
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

    service.registerOrLoginUser = async (isNewUser, userInfo, navigateTo, loading) => {
        loading(true);
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
                loading(false);
            }
        } catch (error) {
            console.log(error);
            loading(false);
        }
    }

    service.handleGoogleSignIn = async (code, navigateTo, loading) => {
        loading(true);
        try {
            const response = await SignInService.googleSignIn({ code: code });
            if (response.status === "success") {
                AuthServices.setAuthToken(response.accessToken, 'google');
                localStorage.setItem('email', response.email);
                navigateTo('/home');
            } else {
                alert(response.message);
                AuthServices.removeAuthToken();
                loading(false);
            }
        } catch (error) {
            AuthServices.removeAuthToken();
            console.log(error);
            loading(false);
        }
    }

    service.facebookLogin = (navigateTo, loading) => {
        loading(true);
        window.FB.login(function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded, got access token: ', response.authResponse);
                if (response.status === 'connected') {
                    AuthServices.setAuthToken(response.authResponse.accessToken, 'facebook');
                    navigateTo('/home');
                    return
                }
                console.error('Facebook login failed, no access token: ', response);
                loading(false);
            } else {
                console.error('Facebook login failed, response: ', response);
                loading(false);
            }
        }, { scope: 'public_profile,email,user_birthday,user_gender' });
    }
    return service;
}());

export default SignInService;