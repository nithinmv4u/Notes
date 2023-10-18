import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";
// import axiosInstance from "../utils/axiosInstance";
import useAxios from "../utils/useAxios";

const HomePage = () => {
    const {authToken, logoutUser} = useContext(AuthContext)
    const [notes, setNotes] = useState([]);
    const api = useAxios()

    console.log(notes);
    console.log("access HomePage",jwt_decode(authToken.access));

    // const getNotes = async () => {
    //     console.log("get notes frontend");
    //     const response = await fetch('http://127.0.0.1:8000/api/notes/', {
    //         method : 'GET',
    //         headers : {
    //             'Content-Type' : 'application/json',
    //             'Authorization' : 'Bearer ' + String(authToken?.access),
    //         },
    //     })
    //     const data = await response.json()
    //     if(response?.status === 200){
    //         setNotes(data)
    //     }else if(response?.statusText === "Unauthorized"){
    //         logoutUser()
    //     }
    // }

    const getNotes = async() => {
        console.log("get Notes");
        const response = await api.get('/api/notes/');
        console.log("response : ",response);
        if(response.status === 200){
            setNotes(response.data)
        }else{
            logoutUser();
        }
    }

    useEffect(() => {
        console.log("useEffect");
        getNotes()
    },[]);



    return notes.length ? (
        <div>
            <p>Homepage</p>
            <ul>
                { notes.map((note) =>(
                        <li key={note?.id}>Item : { note?.body }</li>
                ))}
            </ul>
        </div>
    ) : (
        <p>no notes present</p>
    )
}

export default HomePage