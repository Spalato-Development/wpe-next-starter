import React, { useContext, useEffect } from "react";
import Router from 'next/router'
import useAuth from "../../lib/hooks/useAuth"

const Dashboard = () => {

    const { isLoggedIn, user, deleteAuthData, isLoading } = useAuth()

    // TODO:
    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            Router.push("/auth/login")
        }
    }, [isLoading, isLoggedIn])


    const onLogout = () => {
        deleteAuthData();
        Router.push("/auth/login")
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <>
            <h1>Dashboard</h1>
            {
                user &&
                <>
                    <h2>{`Welcome ${user.name}!`}</h2>
                    <div>
                        <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" onClick={onLogout}>Logout</button>
                    </div>
                </>
            }
        </>
    )
}

export default Dashboard;