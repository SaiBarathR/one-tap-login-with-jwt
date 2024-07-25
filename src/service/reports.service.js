import { urls } from "../config";
import { AuthServices } from "./auth.service";

const ReportService = (function () {
    let service = {};
    const baseUrl = urls.baseURL;
    let headers = { 'Content-Type': 'application/json', }
    const urlList = {
        getReports: baseUrl + '/reports',
    }

    service.getReports = function () {
        const header = { ...headers, 'x-access-token': AuthServices.getAuthToken() }
        return fetch(urlList.getReports, {
            method: 'GET',
            headers: header,
        }).then(response => {
            return response.json() || response || "No response";
        }).catch((error) => {
            return error;
        });
    }

    return service;
}());

export default ReportService;