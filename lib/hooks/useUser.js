import React, { useEffect, useState } from "react";
import Router from 'next/router'

const useUser = ({ redirectTo }) => {

    const [user, setUser] = useState(null)

    const getUser = () => {

        const _user = {
            name: "carlos"
        }
        if (!_user) {
            Router.push(redirectTo || "/")
        } else {
            setUser({
                name: "carlos"
            })
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    return { user }
}

export default useUser;