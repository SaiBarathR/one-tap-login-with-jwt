import { useNavigate } from "react-router";
import { AuthServices } from "../service/auth.service";
import ButtonRenderer from "./common/ButtonRenderer";
import { googleLogout } from '@react-oauth/google';

export default function Logout() {

    const navigateTo = useNavigate();

    const handleLogout = () => {
        switch (sessionStorage.getItem('signInType')) {
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
    }

    return <ButtonRenderer className={'py-2'} text="Logout" onClickAction={handleLogout} />
}