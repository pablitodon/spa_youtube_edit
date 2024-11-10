import { Navigate, Outlet } from "react-router";

interface PrivateRouteProps {
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
    const isAuth = localStorage.getItem('myToken');
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;