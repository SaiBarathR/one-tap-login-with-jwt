import {createBrowserRouter} from "react-router-dom";
import Login from "../Login/Login";
import { ProtectedRoute } from "./ProtectedRoute";

// Create a browser router and define the routes 
export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    }
    ,
    {
        path: "/*",
        element: <ProtectedRoute />
    }
]);

