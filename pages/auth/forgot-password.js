import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Link from 'next/link'
import Router from 'next/router'
import useAuth from "../../lib/hooks/useAuth"

import { WP_SEND_PASSWORD_RESET } from "../../lib/api/auth";

// https://dev.to/ksushiva/authentication-with-react-js-9e4
const ForgotPassword = () => {

    const [emailSent, setEmailSent] = React.useState(false);
    const [forgotPassword, { loading, error }] = useMutation(WP_SEND_PASSWORD_RESET, {
        onCompleted: data => {
            setEmailSent(true);
        },
        onError: error => {
            console.log("error: ", error)
        }
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = data => {
        forgotPassword({
            variables: {
                username: data.username,
            }
        })
    };

    if (loading) return <p>Sending email in ...!</p>;

    if (emailSent) return (
        <div>
            <p>Email sent. Check your inbox!</p>
            <Link href="/auth/login">
                <a>Go to Login</a>
            </Link>
        </div>
    )

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="block mb-2 text-indigo-500" htmlFor="username">Username</label>
                <input
                    {...register("username", { required: true })}
                    className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                    type="text"
                    name="username"
                />
                {errors.username && errors.username.type === "required" && <span className="text-red-300" >This field is required</span>}
            </div>
            {error && <div>
                <p className="text-red-300">Error: {error.message}</p>
            </div>}
            <div>
                <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Send</button>
            </div>
        </form>
    )
}

export default ForgotPassword