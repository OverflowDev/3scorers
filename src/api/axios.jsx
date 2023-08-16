import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URI

const axiosPrivate = axios.create({
    // baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
})

// Request 
axiosPrivate.interceptors.request.use((config) => {

    let tokensData = JSON.parse(localStorage.getItem('tokens'))

    if(!config.headers['Authorization']){
        config.headers['Authorization'] = `Bearer ${tokensData?.accessToken}`
    }

    return config
}, (error) => Promise.reject(error))

// Response 
axiosPrivate.interceptors.response.use(
    response => response,
    async(error) => {
        const prevRequest = error?.config
        if(error?.response?.status === 401 ) {
            const authData = JSON.parse(localStorage.getItem('tokens'))
            const payload = {
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken
            }

            let response = await axios.post('https://test.3scorers.com/api/v1/admin/login', payload)
            localStorage.setItem('tokens', JSON.stringify(response.data))

            prevRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`

            return axios(error.config)
        } else {
            return Promise.reject(error)
        }
    }

)

export default axiosPrivate