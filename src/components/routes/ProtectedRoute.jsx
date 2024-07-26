import { Navigate } from "react-router-dom";
import { AuthServices } from "../../service/auth.service";
import HomePage from "../Home/HomePage.jsx";

export const ProtectedRoute = ({ children }) => {
    // If the user is logged in, navigate to the home page, otherwise, navigate to the login page
    if (AuthServices.authUser()) {
        return <HomePage />;
    }
    else {
        return <Navigate to="/login" />;
    }
};