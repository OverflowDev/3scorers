import { useState, createContext } from "react";

import axios from 'axios'

import jwtDecode from "jwt-decode";
// import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    // const navigate = useNavigate()


    const [user, setUser] = useState(() => {
        if(localStorage.getItem('tokens')) {
            let tokens = JSON.parse(localStorage.getItem('tokens'))
            return jwtDecode(tokens.accessToken)
        }

        return null
    })


    const login = async (payload) => {
        try {
            
            const response = await axios.post('https://test.3scorers.com/api/v1/admin/login', 
                payload, 
                {
                    headers: {'Content-Type': 'application/json'},
                }
            )
    
            localStorage.setItem('tokens', JSON.stringify(response.data))
    
            setUser(jwtDecode(response?.data?.accessToken))
            // navigate('/overview')
        } catch (error) {
            if(!error?.response) {
                console.log('No server Response');
            } else if(error.response?.status === 400) {
                console.log('Missing username and password');
                // setLoginError('Missing username and password')
            } else if(error.response?.status === 401) {
                console.log('unauthorized');
                // setLoginError('Unauthorized')
            } else {
                console.log('Login failed')
            }
        }
    }


    const logout = () => {
        localStorage.removeItem("tokens");
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ 
           user,
           setUser,
           login,
           logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext