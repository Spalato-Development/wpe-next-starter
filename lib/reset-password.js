import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Link from 'next/link'
import Router from 'next/router'
import { AuthContext } from "./context/authContext";
import { useRouter } from 'next/router'

import { WP_RESET_USER_PASSWORD } from "./api/auth";

// https://dev.to/ksushiva/authentication-with-react-js-9e4
const ResetPassword = () => {

    // const [state, setState] = React.useState({
    //     loggedUser: null,
    //     error: null
    // });

    const router = useRouter()

    const { key, login } = router.query

    const [resetPassword, { loading, error }] = useMutation(WP_RESET_USER_PASSWORD, {
        onCompleted: data => {
            console.log("data: ", data)
        },
        onError: error => {
            console.log("error: ", error)
        }
    });


    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        resetPassword({
            variables: {
                key,
                login,
                password: data.password,
            }
        })
    };



    useEffect(() => {
    }, [])
    console.log("-- query: ", router.query)

    if (loading) return <p>Changing password ...!</p>;

    const submitDisabled = !key && !login
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
                <input
                    {...register("password", { required: true })}
                    className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                    type="text"
                    name="password"
                />
                {errors.password && errors.password.type === "required" && <span className="text-red-300" >This field is required</span>}
            </div>
            {error && <div>
                <p className="text-red-300">Error: {error.message}</p>
            </div>}


            <div>
                <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" disabled={submitDisabled} type="submit">Send</button>
            </div>
        </form>
    )
}

export default ResetPassword