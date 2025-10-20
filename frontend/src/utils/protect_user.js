import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"


const ProtectedRoute = ({children}) => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let location = useLocation();
    if (!userInfo) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    return children

};

export default ProtectedRoute;
