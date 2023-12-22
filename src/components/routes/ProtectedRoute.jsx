import { Navigate } from "react-router-dom";
import { AuthServices } from "../../service/auth.service";

export const ProtectedRoute = ({ children }) => {
    // If the user is logged in, navigate to the home page, otherwise, navigate to the login page
    if (AuthServices.authUser()) {
        return <Navigate to="/home" />;
    }
    else {
        return <Navigate to="/login" />;
    }
};