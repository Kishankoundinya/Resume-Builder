import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import Login from './Login'
import { useSelector } from "react-redux";

const Layout = () => {

    const { user, loading } = useSelector(state => state.auth)
    if (loading) {
        return <Loader />
    }
    return (
        <div>

            {
                user ? (
                    <div className="bg-black min-h-screen">
                        <Navbar />
                        <Outlet />
                    </div>
                )
                    : <Login />
            }
        </div>
    )
}

export default Layout