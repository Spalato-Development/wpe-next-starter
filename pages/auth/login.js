import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { WP_LOGIN } from "../../lib/api/auth";

const Login = () => {

    const [loggedUser, setLoggedUser] = React.useState(null);
    const [loginError, setLoginError] = React.useState(null);

    const [login, { loading, error }] = useMutation(WP_LOGIN, {
        onCompleted: data => {
            setLoggedUser({
                ...data.login.user,
                authToken: data.login.authToken
            })

            setLoginError(null);
            reset({})
        },
        onError: error => {
            setLoginError(error.message);
        }
    });

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
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
        setLoggedUser(null);
    }

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
                <p className="text-red-300">Loggin Error: {loginError.message}</p>
            </div>}
            <div>
                <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Login</button>
            </div>
        </form>
    )
}

export default Login