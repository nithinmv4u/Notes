import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const baseURL = 'http://127.0.0.1:8000'

const useAxios = () => {

    const {authToken, setUser, setAuthToken} = useContext(AuthContext);
    const axiosInstance = axios.create({
        baseURL,
        headers : {Authorization : `Bearer ${authToken?.access}`},
        withCredentials: true,
    });

    axiosInstance.interceptors.request.use(async req => {
        console.log('Interceptor');
    
        const user = jwt_decode(authToken?.access)
        const isExpiry = dayjs.unix(user?.exp).diff(dayjs()) < 1;
    
        if(!isExpiry) return req;
    
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh : authToken?.refresh,
        });
        localStorage.setItem('authToken', JSON.stringify(response?.data))

        setUser(jwt_decode(response?.data?.access))
        setAuthToken(response.data)

        req.headers.Authorization = `Bearer ${response?.data?.access}`
    
        return req;
    });
    return axiosInstance;
}

export default useAxios;