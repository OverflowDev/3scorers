import {useState, useEffect} from 'react'

import axios from 'axios'

import { useNavigate } from "react-router-dom"

import Scorer from '../assets/scorer.svg'
import useAuth from '../hooks/useAuth'

function Signup() {

    const {login} = useAuth()

    const navigate = useNavigate()

    const [backendErrors, setBackendErrors] = useState(null)
    const [isFormFilled, setIsFormFilled] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        repeat_password: "",
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({
          ...formData,
        //   [name]: name === 'username' ? value.toLowerCase() : value
          [name]: value
        })
    }

    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every((value) => value !== '');
        setIsFormFilled(allFieldsFilled);
    }, [formData]);

    
    const onRegistration = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://test.3scorers.com/api/v1/admin/sign-up/?adminId=1', formData,
                {
                    headers: {'Content-Type': 'application/json'},
                }
            )

            let payload = {
                email: formData.email,
                password: formData.password,
            }

            // login(payload)

            if (response.data.success) {

                await login(payload)
                navigate('/overview')
                console.log('Created user')

            } else {
                console.log('error');
            }
            
        } catch (error) {
            console.log(error)

           if(!error?.response) {
            console.log('No server Response');
           } else if(error.response?.status === 409) {
            // console.log(error.response?.data?.data);
            setBackendErrors(error.response?.data?.data)
           } else {
            console.log('Registration failed');
           }
        }
    }

  return (
    <div className='h-screen bg-scorers grid md:grid-cols-2'>
    <div className='flex flex-col items-center text-white justify-center'>
        <img src={Scorer} alt="3Scorer" className='h-24 w-24' />
        <div className="flex-col">
            <h1 className='font-bold text-4xl tracking-wide'>Create Account</h1>
            <h3 className='font-light text-center'>Join the community and have fun <br />predicting! </h3>
        </div>
    </div>
    <div className='bg-white flex flex-col items-center justify-center'>
        {/* Form  */}
        <div className='w-4/5'>
            <form onSubmit={onRegistration}>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Email</label>
                    <input 
                        className=" border border-gray-900 rounded w-full py-2 px-3 text-gray-600" 
                        placeholder="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">First Name</label>
                    <input 
                        className=" border border-gray-900 rounded w-full py-2 px-3 text-gray-600" 
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Last Name</label>
                    <input 
                        className=" border border-gray-900 rounded w-full py-2 px-3 text-gray-600" 
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Username</label>
                    <input 
                        className=" border border-gray-900 rounded w-full py-2 px-3 text-gray-600" 
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Password</label>
                    <input 
                        className=" border border-gray-900 rounded w-full py-2 px-3 text-gray-600" 
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Confirm Password</label>
                    <input 
                        className=" border border-gray-900 rounded w-full py-2 px-3 text-gray-600" 
                        placeholder="Password"
                        type="password"
                        name="repeat_password"
                        value={formData.repeat_password}
                        onChange={onChange}
                    />
                </div>

                <div>
                    <p className="error">{backendErrors}</p>
                </div>

                <div className='flex justify-center md:mt-16'>
                    <button
                        className='py-2 px-3 w-1/3 text-center bg-scorers rounded-md text-white'
                        type='submit'
                        disabled={!isFormFilled}
                    >
                        {!isFormFilled ? 'Fill all form' : 'Sign Up'}
                        {/* Sign Up */}
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
  )
}

export default Signup