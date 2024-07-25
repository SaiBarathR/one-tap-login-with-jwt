import { urls } from "../config";
import { AuthServices } from "./auth.service";

const SignInService = (function () {
    let service = {};
    const baseUrl = urls.baseURL;
    let headers = { 'Content-Type': 'application/json', }
    const urlList = {
        signIn: baseUrl + '/auth/signin',  
    }

    service.registerOrLoginUser = async (isNewUser, userInfo, navigateTo, loading, alert) => {
        loading(true);
        try {
            const response = await fetch(urlList['signIn'], {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userInfo),
            });
            const data = await response.json();
            if (data.status === "success") {
                AuthServices.setAuthToken(data.accessToken, 'manual');
                localStorage.setItem('account', data.account);
                navigateTo('/home');
            }
            else {
                alert(data.message);
                loading(false);
            }
        } catch (error) {
            console.log(error);
            loading(false);
        }
    }

    return service;
}());

export default SignInService;