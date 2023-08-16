import { useState, useEffect } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import axiosPrivate from '../api/axios'

import useAuth from '../hooks/useAuth'

import Avatar from '../assets/avatar.svg'
import Scorers from '../assets/scorer.svg'

function Overview() {

    const {user, logout} = useAuth()

    const [users, setUsers] = useState()

    let location = useLocation()
    let navigate = useNavigate()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getUsers = async () => {

            try {
                const {data} = await axiosPrivate.get('https://test.3scorers.com/api/v1/admin/get-users/', {
                    // signal: controller.signal
                })

                // console.log(data?.data);
                isMounted && setUsers(data?.data)
                // setUsers(data?.data)
            } catch (error) {
                console.log(error)
                navigate('/login', {state:{from: location}, replace: true })
            }
        }

        getUsers()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const onLogout = () => {
        logout()
        navigate('/')
    }
    
  return (
    <div>
            <div className="flex min-h-screen flex-row bg-[#F4F4F4] text-gray-800">
        {/* sidebar  */}
        <aside className=" w-56 bg-scorers">
            <div className="my-4 border-b-2 border-gray-300 text-center flex justify-center p-4">
                <img src={Scorers} alt="3scorers" className='h-24 w-24 text-center' />
            </div>
            <div className="my-12 flex flex-col items-center justify-center mt-6 space-y-4 tracking-wide">
                <Link 
                    to='/overview'
                    className={`py-3 px-4 w-full flex items-center space-x-4 text-bold ${location.pathname === '/overview' ? 'bg-secondary text-black hover:bg-scorersDark/75' : 'bg-transparent text-white hover:bg-scorers2/90' }`}
                >
                    
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.27576 11.8889H10.3869V3H3.27576V11.8889ZM3.27576 19H10.3869V13.6667H3.27576V19ZM12.1646 19H19.2758V10.1111H12.1646V19ZM12.1646 3V8.33333H19.2758V3H12.1646Z" fill="#303030"/>
                    </svg>
                    <span className='-mr-1 font-medium'>Overview</span>
                </Link>
                <Link 
                    to='/users'
                    className={`py-3 px-4 w-full flex items-center space-x-4 text-bold ${location.pathname === '/users' ? 'bg-secondary' : 'bg-transparent text-white hover:bg-scorers2/90' }`}
                >
                    
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5758 9.22C12.1093 8.75813 12.5373 8.18688 12.8306 7.54502C13.124 6.90316 13.2758 6.20571 13.2758 5.5C13.2758 4.17392 12.749 2.90215 11.8113 1.96447C10.8736 1.02678 9.60184 0.5 8.27576 0.5C6.94967 0.5 5.67791 1.02678 4.74022 1.96447C3.80254 2.90215 3.27576 4.17392 3.27576 5.5C3.27575 6.20571 3.42756 6.90316 3.72088 7.54502C4.01421 8.18688 4.44218 8.75813 4.97576 9.22C3.5759 9.85388 2.38822 10.8775 1.55474 12.1685C0.721252 13.4596 0.277229 14.9633 0.275757 16.5C0.275757 16.7652 0.381114 17.0196 0.56865 17.2071C0.756186 17.3946 1.01054 17.5 1.27576 17.5C1.54097 17.5 1.79533 17.3946 1.98286 17.2071C2.1704 17.0196 2.27576 16.7652 2.27576 16.5C2.27576 14.9087 2.9079 13.3826 4.03312 12.2574C5.15833 11.1321 6.68446 10.5 8.27576 10.5C9.86706 10.5 11.3932 11.1321 12.5184 12.2574C13.6436 13.3826 14.2758 14.9087 14.2758 16.5C14.2758 16.7652 14.3811 17.0196 14.5687 17.2071C14.7562 17.3946 15.0105 17.5 15.2758 17.5C15.541 17.5 15.7953 17.3946 15.9829 17.2071C16.1704 17.0196 16.2758 16.7652 16.2758 16.5C16.2743 14.9633 15.8303 13.4596 14.9968 12.1685C14.1633 10.8775 12.9756 9.85388 11.5758 9.22ZM8.27576 8.5C7.68241 8.5 7.10239 8.32405 6.60905 7.99441C6.1157 7.66476 5.73118 7.19623 5.50412 6.64805C5.27706 6.09987 5.21765 5.49667 5.3334 4.91473C5.44916 4.33279 5.73488 3.79824 6.15444 3.37868C6.57399 2.95912 7.10854 2.6734 7.69049 2.55764C8.27243 2.44189 8.87563 2.5013 9.42381 2.72836C9.97199 2.95542 10.4405 3.33994 10.7702 3.83329C11.0998 4.32664 11.2758 4.90666 11.2758 5.5C11.2758 6.29565 10.9597 7.05871 10.3971 7.62132C9.83447 8.18393 9.07141 8.5 8.27576 8.5ZM18.0158 8.82C18.6557 8.09933 19.0738 7.20905 19.2196 6.25634C19.3654 5.30362 19.2327 4.32907 18.8375 3.45C18.4424 2.57093 17.8015 1.8248 16.9922 1.30142C16.1829 0.77805 15.2396 0.499742 14.2758 0.5C14.0105 0.5 13.7562 0.605357 13.5687 0.792893C13.3811 0.98043 13.2758 1.23478 13.2758 1.5C13.2758 1.76522 13.3811 2.01957 13.5687 2.20711C13.7562 2.39464 14.0105 2.5 14.2758 2.5C15.0714 2.5 15.8345 2.81607 16.3971 3.37868C16.9597 3.94129 17.2758 4.70435 17.2758 5.5C17.2743 6.02524 17.1351 6.5409 16.8718 6.99542C16.6086 7.44994 16.2306 7.82738 15.7758 8.09C15.6275 8.17552 15.5037 8.29766 15.4161 8.44474C15.3286 8.59182 15.2802 8.7589 15.2758 8.93C15.2716 9.09976 15.3107 9.2678 15.3894 9.41826C15.4681 9.56872 15.5839 9.69665 15.7258 9.79L16.1158 10.05L16.2458 10.12C17.4512 10.6917 18.4681 11.596 19.1767 12.7263C19.8854 13.8566 20.2563 15.1659 20.2458 16.5C20.2458 16.7652 20.3511 17.0196 20.5387 17.2071C20.7262 17.3946 20.9805 17.5 21.2458 17.5C21.511 17.5 21.7653 17.3946 21.9529 17.2071C22.1404 17.0196 22.2458 16.7652 22.2458 16.5C22.2539 14.9654 21.8696 13.4543 21.1292 12.1101C20.3889 10.7659 19.3171 9.63331 18.0158 8.82Z" fill="#004F4F"/>
                        </svg>
                    <span className='-mr-1 font-medium'>Users</span>
                </Link>
                <Link 
                    to='/admin'
                    className={`py-3 px-4 w-full flex items-center space-x-4 text-bold ${location.pathname === '/admin' ? 'bg-secondary' : 'bg-transparent text-white hover:bg-scorers2/90' }`}
                >
                    
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.87576 6.9C6.87576 7 6.97576 7.1 7.07576 7.2L9.07576 9.2C9.27576 9.4 9.47576 9.5 9.77576 9.5C10.0758 9.5 10.2758 9.4 10.4758 9.2C10.8758 8.8 10.8758 8.2 10.4758 7.8L10.1758 7.5H14.3758L14.0758 7.8C13.8758 8 13.7758 8.2 13.7758 8.5C13.7758 9.1 14.1758 9.5 14.7758 9.5C15.0758 9.5 15.2758 9.4 15.4758 9.2L17.4758 7.2C17.5758 7.1 17.6758 7 17.6758 6.9C17.6758 6.8 17.7758 6.7 17.7758 6.5C17.7758 6.4 17.7758 6.2 17.6758 6.1C17.5758 6 17.5758 5.9 17.4758 5.8L15.4758 3.8C15.0758 3.4 14.4758 3.4 14.0758 3.8C13.6758 4.2 13.6758 4.8 14.0758 5.2L14.3758 5.5H10.1758L10.4758 5.2C10.8758 4.8 10.8758 4.2 10.4758 3.8C10.0758 3.4 9.47576 3.4 9.07576 3.8L7.07576 5.8C6.97576 5.9 6.87576 6 6.87576 6.1C6.87576 6.2 6.77576 6.3 6.77576 6.5C6.77576 6.6 6.77576 6.8 6.87576 6.9ZM6.27576 14.7C7.67576 14.7 8.87576 13.5 8.87576 12.1C8.87576 10.7 7.67576 9.5 6.27576 9.5C4.87576 9.5 3.67576 10.7 3.67576 12.1C3.67576 13.5 4.87576 14.7 6.27576 14.7ZM10.0758 17.4C7.47576 15.3 3.67576 15.7 1.57576 18.3C1.37576 18.6 1.27576 18.9 1.27576 19.2C1.27576 19.9 1.87576 20.5 2.57576 20.5H9.97576C10.4758 20.5 10.9758 20.2 11.1758 19.8C11.3758 19.4 11.3758 18.8 10.9758 18.4C10.6758 18 10.3758 17.7 10.0758 17.4ZM15.6758 12.1C15.6758 13.5 16.8758 14.7 18.2758 14.7C19.6758 14.7 20.8758 13.5 20.8758 12.1C20.8758 10.7 19.6758 9.5 18.2758 9.5C16.8758 9.5 15.6758 10.7 15.6758 12.1ZM22.9758 18.4C22.6758 18.1 22.3758 17.7 22.0758 17.5C19.4758 15.4 15.6758 15.8 13.5758 18.4C13.3758 18.6 13.2758 18.9 13.2758 19.2C13.2758 19.9 13.8758 20.5 14.5758 20.5H21.9758C22.4758 20.5 22.9758 20.2 23.1758 19.8C23.3758 19.3 23.2758 18.8 22.9758 18.4Z" fill="#007575"/>
                        </svg>
                    <span className='-mr-1 font-medium'>Admin</span>
                </Link>
                <button
                    onClick={onLogout}
                    className='py-3 px-4 w-full flex items-center space-x-4 text-bold text-white'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span className='-mr-1 font-medium'>Logout</span>
                </button>
            </div>
        </aside>
        {/* main  */}
        <main className="-ml-48 flex flex-grow flex-col md:ml-0">
            {/* Navbar  */}
            <div className='bg-white w-full py-3 px-4 flex justify-between border-2'>
                <h1 className='text-2xl font-semibold text-scorers'>Overview</h1>
                <div className='flex flex-col items-center'>
                    <h1 className='text-medium text-lg'>Rex Stephen</h1>
                    <h1 className='text-normal text-sm'>Administrator</h1>
                </div>
            </div>
            {/* content  */}
            <div className="h-full m-4 px-8 ">

                <div className='flex items-center gap-8'>

                    <div className='flex items-center justify-between bg-scorersDark w-80 h-40 p-4 text-white rounded-lg'>
                        <div className='flex flex-col'>
                            <h1 className='font-extralight text-2xl uppercase'>Total number of users</h1>
                            <h1 className='font-bold text-2xl'>1,000,000</h1>
                        </div>
                        <div className='h-10 w-10 bg-white rounded-full flex items-center justify-center '>
                            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5758 9.22C12.1093 8.75813 12.5373 8.18688 12.8306 7.54502C13.124 6.90316 13.2758 6.20571 13.2758 5.5C13.2758 4.17392 12.749 2.90215 11.8113 1.96447C10.8736 1.02678 9.60184 0.5 8.27576 0.5C6.94967 0.5 5.67791 1.02678 4.74022 1.96447C3.80254 2.90215 3.27576 4.17392 3.27576 5.5C3.27575 6.20571 3.42756 6.90316 3.72088 7.54502C4.01421 8.18688 4.44218 8.75813 4.97576 9.22C3.5759 9.85388 2.38822 10.8775 1.55474 12.1685C0.721252 13.4596 0.277229 14.9633 0.275757 16.5C0.275757 16.7652 0.381114 17.0196 0.56865 17.2071C0.756186 17.3946 1.01054 17.5 1.27576 17.5C1.54097 17.5 1.79533 17.3946 1.98286 17.2071C2.1704 17.0196 2.27576 16.7652 2.27576 16.5C2.27576 14.9087 2.9079 13.3826 4.03312 12.2574C5.15833 11.1321 6.68446 10.5 8.27576 10.5C9.86706 10.5 11.3932 11.1321 12.5184 12.2574C13.6436 13.3826 14.2758 14.9087 14.2758 16.5C14.2758 16.7652 14.3811 17.0196 14.5687 17.2071C14.7562 17.3946 15.0105 17.5 15.2758 17.5C15.541 17.5 15.7953 17.3946 15.9829 17.2071C16.1704 17.0196 16.2758 16.7652 16.2758 16.5C16.2743 14.9633 15.8303 13.4596 14.9968 12.1685C14.1633 10.8775 12.9756 9.85388 11.5758 9.22ZM8.27576 8.5C7.68241 8.5 7.10239 8.32405 6.60905 7.99441C6.1157 7.66476 5.73118 7.19623 5.50412 6.64805C5.27706 6.09987 5.21765 5.49667 5.3334 4.91473C5.44916 4.33279 5.73488 3.79824 6.15444 3.37868C6.57399 2.95912 7.10854 2.6734 7.69049 2.55764C8.27243 2.44189 8.87563 2.5013 9.42381 2.72836C9.97199 2.95542 10.4405 3.33994 10.7702 3.83329C11.0998 4.32664 11.2758 4.90666 11.2758 5.5C11.2758 6.29565 10.9597 7.05871 10.3971 7.62132C9.83447 8.18393 9.07141 8.5 8.27576 8.5ZM18.0158 8.82C18.6557 8.09933 19.0738 7.20905 19.2196 6.25634C19.3654 5.30362 19.2327 4.32907 18.8375 3.45C18.4424 2.57093 17.8015 1.8248 16.9922 1.30142C16.1829 0.77805 15.2396 0.499742 14.2758 0.5C14.0105 0.5 13.7562 0.605357 13.5687 0.792893C13.3811 0.98043 13.2758 1.23478 13.2758 1.5C13.2758 1.76522 13.3811 2.01957 13.5687 2.20711C13.7562 2.39464 14.0105 2.5 14.2758 2.5C15.0714 2.5 15.8345 2.81607 16.3971 3.37868C16.9597 3.94129 17.2758 4.70435 17.2758 5.5C17.2743 6.02524 17.1351 6.5409 16.8718 6.99542C16.6086 7.44994 16.2306 7.82738 15.7758 8.09C15.6275 8.17552 15.5037 8.29766 15.4161 8.44474C15.3286 8.59182 15.2802 8.7589 15.2758 8.93C15.2716 9.09976 15.3107 9.2678 15.3894 9.41826C15.4681 9.56872 15.5839 9.69665 15.7258 9.79L16.1158 10.05L16.2458 10.12C17.4512 10.6917 18.4681 11.596 19.1767 12.7263C19.8854 13.8566 20.2563 15.1659 20.2458 16.5C20.2458 16.7652 20.3511 17.0196 20.5387 17.2071C20.7262 17.3946 20.9805 17.5 21.2458 17.5C21.511 17.5 21.7653 17.3946 21.9529 17.2071C22.1404 17.0196 22.2458 16.7652 22.2458 16.5C22.2539 14.9654 21.8696 13.4543 21.1292 12.1101C20.3889 10.7659 19.3171 9.63331 18.0158 8.82Z" fill="#004F4F"/>
                            </svg>
                        </div>
                    </div>

                    <div className='flex items-center justify-between bg-scorers2 w-80 h-40 p-4 text-white rounded-lg'>
                        <div className='flex flex-col'>
                            <h1 className='font-extralight text-2xl uppercase'>Total number of admins</h1>
                            <h1 className='font-bold text-2xl'>970</h1>
                        </div>
                        <div className='h-10 w-10 bg-white rounded-full flex items-center justify-center '>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.87576 6.9C6.87576 7 6.97576 7.1 7.07576 7.2L9.07576 9.2C9.27576 9.4 9.47576 9.5 9.77576 9.5C10.0758 9.5 10.2758 9.4 10.4758 9.2C10.8758 8.8 10.8758 8.2 10.4758 7.8L10.1758 7.5H14.3758L14.0758 7.8C13.8758 8 13.7758 8.2 13.7758 8.5C13.7758 9.1 14.1758 9.5 14.7758 9.5C15.0758 9.5 15.2758 9.4 15.4758 9.2L17.4758 7.2C17.5758 7.1 17.6758 7 17.6758 6.9C17.6758 6.8 17.7758 6.7 17.7758 6.5C17.7758 6.4 17.7758 6.2 17.6758 6.1C17.5758 6 17.5758 5.9 17.4758 5.8L15.4758 3.8C15.0758 3.4 14.4758 3.4 14.0758 3.8C13.6758 4.2 13.6758 4.8 14.0758 5.2L14.3758 5.5H10.1758L10.4758 5.2C10.8758 4.8 10.8758 4.2 10.4758 3.8C10.0758 3.4 9.47576 3.4 9.07576 3.8L7.07576 5.8C6.97576 5.9 6.87576 6 6.87576 6.1C6.87576 6.2 6.77576 6.3 6.77576 6.5C6.77576 6.6 6.77576 6.8 6.87576 6.9ZM6.27576 14.7C7.67576 14.7 8.87576 13.5 8.87576 12.1C8.87576 10.7 7.67576 9.5 6.27576 9.5C4.87576 9.5 3.67576 10.7 3.67576 12.1C3.67576 13.5 4.87576 14.7 6.27576 14.7ZM10.0758 17.4C7.47576 15.3 3.67576 15.7 1.57576 18.3C1.37576 18.6 1.27576 18.9 1.27576 19.2C1.27576 19.9 1.87576 20.5 2.57576 20.5H9.97576C10.4758 20.5 10.9758 20.2 11.1758 19.8C11.3758 19.4 11.3758 18.8 10.9758 18.4C10.6758 18 10.3758 17.7 10.0758 17.4ZM15.6758 12.1C15.6758 13.5 16.8758 14.7 18.2758 14.7C19.6758 14.7 20.8758 13.5 20.8758 12.1C20.8758 10.7 19.6758 9.5 18.2758 9.5C16.8758 9.5 15.6758 10.7 15.6758 12.1ZM22.9758 18.4C22.6758 18.1 22.3758 17.7 22.0758 17.5C19.4758 15.4 15.6758 15.8 13.5758 18.4C13.3758 18.6 13.2758 18.9 13.2758 19.2C13.2758 19.9 13.8758 20.5 14.5758 20.5H21.9758C22.4758 20.5 22.9758 20.2 23.1758 19.8C23.3758 19.3 23.2758 18.8 22.9758 18.4Z" fill="#007575"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='mt-12 grid grid-cols-2 gap-8'>
                    {/* Users  */}
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-lg'>List of Users</h1>
                        <div className='mt-4 bg-white w-full h-80 shadow-lg rounded-lg overflow-auto table-scroll'>
                            {/* Table  */}
                            {
                                users?.length > 0 ? (
                                    <table className=' mt-2 w-full'>
                                        <tbody>
                                            {users.map((usr) => ( usr.role === 'user') && (
                                                <tr key={usr.id} className='relative transform scale-100 flex items-center justify-between py-1 px-8 cursor-default'>
                                                    <td className="px-2 py-2 whitespace-no-wrap flex items-center gap-4">
                                                        <img src={Avatar} alt="avatar" className="h-10 w-10 rounded-lg object-cover" />
                                                        <div className="leading-5 font-bold tracking-wider text-md">{usr.firstName} {' '} {usr.lastName}</div>
                                                    </td>
                                                    <td className="text-xs whitespace-no-wrap">
                                                        <button className='rounded-lg hover:bg-scorers/60 hover:text-white py-2 px-4 text-bold text-scorers tracking-wider text-md focus:outline-none'>View Details</button>
                                                    </td>
                                                </tr>
                                            ))}
                            
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>
                                        NO data is available
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    {/* Admins  */}
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-lg'>List of Admins</h1>
                        <div className='mt-4 bg-white w-full h-80 shadow-lg rounded-lg overflow-auto table-scroll'>
                            {/* Table  */}
                            {
                                users?.length > 0 ? (
                                    <table className=' mt-2 w-full'>
                                        <tbody>
                                            {users.map((usr) => ( usr.role === 'admin') && (
                                                <tr key={usr.id} className='relative transform scale-100 flex items-center justify-between py-1 px-8 cursor-default'>
                                                    <td className="px-2 py-2 whitespace-no-wrap flex items-center gap-4">
                                                        <img src={Avatar} alt="avatar" className="h-10 w-10 rounded-lg object-cover" />
                                                        <div className="leading-5 font-bold tracking-wider text-md">{usr.firstName} {' '} {usr.lastName}</div>
                                                    </td>
                                                    <td className="text-xs whitespace-no-wrap">
                                                        <button className='rounded-lg hover:bg-scorers/60 hover:text-white py-2 px-4 text-bold text-scorers tracking-wider text-md focus:outline-none'>View Details</button>
                                                    </td>
                                                </tr>
                                            ))}
                            
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>
                                        NO data is available
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
        </main>
    </div>
    </div>
  )
}

export default Overview