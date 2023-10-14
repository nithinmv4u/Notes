import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <Link to='/'>Home</Link>
            <span> | </span>
            {user ? 
                <p>Logout</p>            
                : <Link to='/login'>Login</Link> }
            {user && <p>Hello {user.username}</p> }
            
        </div>
    )
}

export default Header;