import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {

    const { loginUser } = useContext(AuthContext)

    return(
        <>
        <p>Login Page</p>
        <form onSubmit={ loginUser } >
            <input type="text" name="username" placeholder="Enter UserName" />
            <input type="password" name="password" placeholder="Enter Password" />
            <input type="submit" />
        </form>
        
        </>
        
    )
}

export default LoginPage