import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Pages/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);

    const location = useLocation();

    if(loading){
        return <Loading />
    }
    if(user && user.email){
        return children;
    }

    return <Navigate to="/auth/login" state={location.pathname}></Navigate>
};

export default PrivateRoute;