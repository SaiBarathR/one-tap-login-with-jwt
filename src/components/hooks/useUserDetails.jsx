import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthServices } from "../../service/auth.service";
import UserService from "../../service/user.service";

export function useUserDetails() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!AuthServices.authUser()) {
            navigateTo('/login');
        }

        switch (sessionStorage.getItem('signInType')) {
            case 'googleOneTap':
                getGoogleUserData(AuthServices.getAuthToken());
                break;
            case 'facebook':
                getFacebookUserData(AuthServices.getAuthToken());
                break;
            default:
                getUserDetails();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getUserDetails() {
        setLoading(true);
        try {
            const response = await UserService.getUserInfo();
            if (response.status === "success") {
                setTimeout(() => {
                    console.log('Successfully accessed user info', response)
                    setUserDetails(response.data);
                    setLoading(false);
                }, 500);
            } else {
                console.log('Error', response);
                setLoading(false);
            }
        }
        catch (error) {
            setLoading(false);
            console.log(error);
        }

    }

    function getGoogleUserData(credential) {
        setLoading(true);
        const data = JSON.parse(atob(credential.split('.')[1]))
        console.log("getGoogleUserData ~ data:", data)
        setTimeout(() => {
            setUserDetails(data);
            setLoading(false);
        }, 500);
    }

    function getFacebookUserData(userId) {
        setLoading(true);
        try {
            window.FB.getLoginStatus(function (response) {
                if (!(response.status === 'connected')) {
                    alert(`Error with facebook login : ${JSON.stringify(response)}`)
                    navigateTo('/login')
                } else {
                    window.FB.api(`me?fields=id,name,email,birthday,gender,picture`, function (response) {
                        console.log('fb data resp', response);
                        if (response && !response.error) {
                            const age = response.birthday ? new Date().getFullYear() - new Date(response.birthday).getFullYear() : '-';
                            const picture = response.picture ? response.picture.data.url : '';
                            if (picture === '') {
                                window.FB.api(`/${userId}/picture`, function (response) {
                                    console.log('fb pic resp', response);
                                    if (response && !response.error) {
                                        const picture = response.data.url;
                                        let userDetails = { ...response, age, picture };
                                        setTimeout(() => {
                                            setUserDetails(userDetails);
                                            setLoading(false);
                                        }, 500);
                                    } else {
                                        console.log('Error getting facebook profile picture', response);
                                    }
                                });
                            }
                            else {
                                let userDetails = { ...response, age, picture };
                                setTimeout(() => {
                                    setUserDetails(userDetails);
                                    setLoading(false);
                                }, 500);
                            }
                        }
                        else {
                            console.log('Error getting facebook data', response);
                            setLoading(false);
                        }
                    });
                }
            });
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return { userDetails, loading }
}