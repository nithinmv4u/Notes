import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const loginUser = async (e) => {
        e.preventDefault()
        console.log("form submit ready");
        console.log("entered username: ", e.target.username.value)
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({'username' : e.target.username.value , 'password' : e.target.password.value}),
        })
        let data = await response.json()
        console.log('data: ',data);
        console.log('response: ',response);
        setUser(jwt_decode(data.access));
    }

    const contextData = {
        user : user,
        loginUser : loginUser,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}