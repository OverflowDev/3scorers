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
        const response = await axios.post('https://test.3scorers.com/api/v1/admin/login', payload)

        localStorage.setItem('tokens', JSON.stringify(response.data))

        setUser(jwtDecode(response?.data?.accessToken))
        // navigate('/overview')
    }


    const logout = () => {
        localStorage.removeItem("tokens");
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ 
           user,
           login,
           logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext