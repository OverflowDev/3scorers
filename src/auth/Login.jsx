import {useState} from 'react'

import useAuth from '../hooks/useAuth'

import { useNavigate } from "react-router-dom"

import Scorer from '../assets/scorer.svg'

function Login() {

    const {login} = useAuth()


    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: name === 'email' ? value.toLowerCase() : value
        });
    }

    
    const onLogin = async (e) => {
        e.preventDefault()

        await login(formData)
        // console.log('success')
        navigate('/overview')
    }

  return (
    <div className='h-screen bg-scorers flex flex-col items-center justify-center md:px-0 px-2'>
    <img src={Scorer} alt="Scorer" className='h-24 w-24 mb-4' />
    <div className='bg-white md:w-1/3 w-full md:h-2/3 h-96 rounded-md drop-shadow-lg '>
        <div className='flex items-center justify-center w-full h-full'>
            <form onSubmit={onLogin} className=''>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Email</label>
                    <input 
                        className=" border border-gray-900 rounded md:w-96 w-full py-2 px-3 text-gray-600" 
                        placeholder="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Password</label>
                    <input 
                        className=" border border-gray-900 rounded md:w-96 w-full py-2 px-3 text-gray-600" 
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                    />
                </div>

                <div className='flex justify-center mt-16'>
                    <button
                        className='py-2 px-3 w-1/3 text-center bg-scorers rounded-md text-white'
                        type='submit'
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login