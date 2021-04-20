import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Link from 'next/link'

import { WP_LOGIN_USER } from "../../lib/api/auth";

const Login = () => {

    const [state, setState] = React.useState({
        loggedUser: null,
        error: null
    });

    const [login, { loading, error }] = useMutation(WP_LOGIN_USER, {
        onCompleted: data => {
            setState({
                ...state,
                loggedUser: {
                    ...data.login.user,
                    authToken: data.login.authToken

                },
                error: null
            })
            reset({})
        },
        onError: error => {
            setLoginError(error.message);
        }
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        login({
            variables: {
                username: data.username,
                password: data.password
            }
        })
    };

    const onLogout = () => {
        // TODO: now is fake
        setState({
            ...state,
            loggedUser: null
        })
    }

    const { loggedUser, error: loginError } = state;

    if (loading) return <p>Loging in ...!</p>;

    if (loggedUser) {
        return (
            <div>
                <h1>Welcome {loggedUser.username}</h1>
                <div>
                    <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" onClick={onLogout}>Logout</button>
                </div>

            </div>
        )
    }

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
            <div>
                <label
                    className="block mb-2 text-indigo-500"
                    htmlFor="password">
                    Password
                </label>
                <input
                    {...register("password", { required: true })}
                    className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                    type="password"
                    name="password"
                />
                {errors.password && errors.password.type === "required" && <span className="text-red-300" >This field is required</span>}
            </div>
            {loginError && <div>
                <p className="text-red-300">Loggin Error: {loginError}</p>
            </div>}
            <div>
                <p>
                    Are you new?
                    <Link href="/auth/register">
                        <a>Register</a>
                    </Link>
                </p>
            </div>
            <div>
                <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Login</button>
            </div>
        </form>
    )
}

export default Login