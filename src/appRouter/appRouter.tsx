import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import App from "../App";
import Favorite from "../components/Favorite/Favorite";
import Main from "../components/Main/Main/Main";

export const appRouter = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        errorElement: <div>Error</div>,
    },
    {
        element: <PrivateRoute />,
        errorElement: <div>Error</div>,
        children: [
            {
                path: "/",
                element: <App />,
                children: [
                    { path: "favorite", element: <Favorite /> },
                    { path: "main", element: <Main /> },
                ]
            }
        ]
    },
]);