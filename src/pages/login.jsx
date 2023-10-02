import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { isLoggedIn } from "@/redux/chatSlice/chatSlice";
import { useLoginUserMutation } from "@/redux/chatSlice/chatApi";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useRouter()
    const dispatch = useDispatch()

    const [loginUser, { data: loginData, isSuccess, isLoading, error, isError }] = useLoginUserMutation()

    console.log({ loginData })

    const onSubmit = data => {
        loginUser(data)
    }


    useEffect(() => {
        if (isSuccess && !isLoading) {
            navigate.push('/')
            dispatch(isLoggedIn(loginData?.jwt))
            toast("successfully logged in")
        }
        if (isError && !isLoading) {
            toast.error('something went wrong, please check your email and password again')
        }
    }, [isLoading])


    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/2  ">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Email
                        </label>
                        <input {...register("email", { required: { value: true, message: "email is required" } })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="enter your email" />

                        {errors.email?.type === 'required' && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input {...register("password", { required: { value: true, message: "password field is required" } })} className="shadow appearance-none border focus:border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />

                        {errors.password?.type === 'required' && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                        <Link href="/signUp" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            register?
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LoginPage;