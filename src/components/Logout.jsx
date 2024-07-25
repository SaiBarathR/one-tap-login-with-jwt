import { useNavigate } from "react-router";
import { AuthServices } from "../service/auth.service";
import ButtonRenderer from "./common/ButtonRenderer";
import { useState } from "react";

export default function Logout() {

    const [loading, setLoading] = useState(false)
    const navigateTo = useNavigate();

    const handleLogout = () => {
        setLoading(true)       
        AuthServices.removeAuthToken();
        localStorage.clear();
        navigateTo('/login');
        setLoading(false)
    }

    return <ButtonRenderer loading={loading} className={'h-8 rounded-lg'} text="Logout" onClickAction={handleLogout} />
}