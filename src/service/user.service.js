import { urls } from "../config";
import { AuthServices } from "./auth.service";

const UserService = (function () {
    let service = {};
    const baseUrl = urls.baseURL;
    let headers = { 'Content-Type': 'application/json', }
    const urlList = {
        usersInfo: baseUrl + '/userInfo',
        deleteAccount: (email) => baseUrl + `/deleteAccount/${sessionStorage.getItem('signInType')}/${email}`,
    }

    service.getUserInfo = function () {
        const header = { ...headers, 'x-access-token': AuthServices.getAuthToken() }
        const body = { email: localStorage.getItem('email'), type: sessionStorage.getItem('signInType') }
        return fetch(urlList.usersInfo, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body),
        }).then(response => {
            return response.json() || response || "No response";
        }).catch((error) => {
            return error;
        });
    }

    service.deleteAccount = function (email) {
        console.log('starting to delete', email)
        const header = { 'x-access-token': AuthServices.getAuthToken() }
        return fetch(urlList.deleteAccount(email), {
            method: 'DELETE',
            headers: header,
        }).then(response => {
            return response.json() || response || "No response";
        }).catch((error) => {
            return error;
        });
    }

    return service;
}());

export default UserService;