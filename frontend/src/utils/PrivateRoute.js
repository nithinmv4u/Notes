import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({ children , ...rest }) => {
    console.log(rest, "private route");
    const authenticated = false
    return authenticated ? (
        <Routes>
            <Route {...rest} >{children }</Route>
        </Routes>        
    ) : (
        <Navigate to='/login'/>
    )
}

export default PrivateRoute;