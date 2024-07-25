import { useNavigate } from "react-router";
import { AuthServices } from "../service/auth.service";
import ButtonRenderer from "./common/ButtonRenderer";
import { googleLogout } from '@react-oauth/google';
import { useState } from "react";

export default function Logout() {

    const [loading, setLoading] = useState(false)
    const navigateTo = useNavigate();

    const handleLogout = () => {
        setLoading(true)
        switch (localStorage.getItem('signInType')) {
            case 'googleOneTap':
            case 'google':
                googleLogout();
                console.log('Google logout succeeded');
                break;
            case 'facebook':
                window.FB.logout(function (response) {
                    console.log('Facebook logout succeeded');
                });
                break;
            default:
                console.log('Successfully logged out');
                break;
        }
        AuthServices.removeAuthToken();
        localStorage.clear();
        navigateTo('/login');
        setLoading(false)
    }

    return <ButtonRenderer loading={loading} className={'h-8 rounded-lg'} text="Logout" onClickAction={handleLogout} />
}