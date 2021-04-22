import React, { useContext, useEffect } from "react";
import Router from 'next/router'
import { AuthContext } from "../../lib/context/authContext";

const Dashboard = () => {

    const { auth: { loading, loggedUser } } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !loggedUser) {
            Router.push("/auth/login")
        }
    }, [loggedUser, loading])

    if (loading) {
        return <p>Loading ...</p>
    }

    return (
        <>
            <h1>Dashboard</h1>
            {
                loggedUser &&
                <h2>{`Welcome ${loggedUser.name}!`}</h2>
            }
        </>
    )
}

export default Dashboard;