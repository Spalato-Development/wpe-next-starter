import React from "react";
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { WP_RESET_USER_PASSWORD } from "../../lib/api/auth";
import { useToast } from "@chakra-ui/react"
import Router from 'next/router'
import Link from 'next/link'

const SetPasswordPage = (props) => {

    const router = useRouter()
    const toast = useToast()
    const { key, login } = router.query

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [setPassword, { loading, error }] = useMutation(WP_RESET_USER_PASSWORD, {
        onCompleted: data => {
            reset({})
            toast({
                title: "Password succesfully reset",
                description: "Your account password has been properly changed!",
                status: "success",
                duration: 1000,
                isClosable: false,
                onCloseComplete: () => Router.push("/auth/login")
            })
        },
        onError: error => {
            console.log("error: ", error.message)
        }
    });

    const onSubmit = data => {
        setPassword({
            variables: {
                key,
                login,
                password: data.password,
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {error && <div>
                <p className="text-red-300">Register error: {error.message}</p>
            </div>}
            <div>
                <p>
                    Did you remember your password?
                    <Link href="/auth/login">
                        <a>Login</a>
                    </Link>
                </p>
            </div>
            <div>
                <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Update</button>
            </div>
        </form>
    )
}

export default SetPasswordPage;