import React, { useContext, useEffect } from "react";
import Router from 'next/router'
import { AuthContext } from "../../lib/context/authContext";

const Dashboard = () => {

    const { auth: { loading, loggedUser }, setAuthData } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !loggedUser) {
            Router.push("/auth/login")
        }
    }, [loggedUser, loading])


    const onLogout = () => {
        setAuthData(null);
        Router.push("/auth/login")
    }

    if (loading) {
        return <p>Loading ...</p>
    }

    return (
        <>
            <h1>Dashboard</h1>
            {
                loggedUser &&
                <>
                    <h2>{`Welcome ${loggedUser.name}!`}</h2>
                    <div>
                        <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" onClick={onLogout}>Logout</button>
                    </div>
                </>
            }
        </>
    )
}

export default Dashboard;