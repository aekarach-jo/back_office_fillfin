import React from 'react'
import AuthLogin from '../components/auth/AuthLogin'

function Home() {
    return (
        <div className="h-screen flex-1 p-7">
            <h1 className="text-2xl font-semibold ">Home page</h1>
            <AuthLogin />
        </div>
    )
}

export default Home
