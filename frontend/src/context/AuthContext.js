import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(() => localStorage.getItem('authtoken') ? jwt_decode(localStorage.getItem('authtoken')) : null);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authtoken') ? JSON.parse(localStorage.getItem('authtoken')) : null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    console.log("authtoken : ",authToken);

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
        if(response.status === 200){
            setUser(jwt_decode(data.access));
            setAuthToken(data);
            localStorage.setItem('authtoken', JSON.stringify(data));
            navigate('/')
        }
        else{
            alert("something went wrong..!\n"+ data?.detail);
        }        
    }

    // ---------refresh token-----------//
    const updateToken = async() =>{
        console.log("update token called..");
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({'refresh' : authToken?.refresh}),
        })
        let data = await response.json()
        if(response?.status === 200){
            setUser(jwt_decode(data.access));
            setAuthToken(data);
            localStorage.setItem('authtoken', JSON.stringify(data))
        }else{
            logoutUser()
        }
        if(loading){
            setLoading(false);
        }
    }

    useEffect(() =>{
        const fourMinutes = 1000 * 60 * 4;
        if(loading){
            updateToken()
        }
        const interval = setInterval(() => {
            if(authToken){
                updateToken()
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    },[authToken,loading])

    const logoutUser = () => {
        setUser(null);
        setAuthToken(null)
        localStorage.removeItem('authtoken');
        navigate('/login')
    }

    const contextData = {
        user : user,
        authToken : authToken,
        loginUser : loginUser,
        logoutUser : logoutUser, 
    }
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}