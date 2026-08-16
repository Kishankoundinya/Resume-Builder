import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authsSlice.js'

const Navbar = () => {
   const {user}=useSelector(state=>state.auth)
   const dispatch=useDispatch()
    const navigate=useNavigate()

    const logoutUser=()=>{
        navigate('/')
        dispatch(logout())

    }
  return (
    <div className='shadow bg-black'>
        <nav className='flex justify-between items-center max-w-7xl mx-auto py-3.5 px-4 text-white transition-all'>
            <Link to='/'>
            <img src="/logo.svg" alt="logo" className='w-auto h-11 '/>
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden'>Hi, {user?.name}</p>
                <button onClick={logoutUser} className='bg-green-700 hover:bg-slate-50  px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>

    </div>
  )
}

export default Navbar