


"use client"
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';


import * as yup from 'yup'


import { Formik, Form, Field, ErrorMessage } from 'formik';




import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";

import { InputCred } from "@/app/componentsMine/InputCred"

import axios from "axios"




const loginValidationSchema = yup.object({

    username: yup.string().required('Enter your Username'),
    password: yup.string().min(8, "Password must be greater than 8 digits").required('Password is required'),


})





const Login = () => {

    const router = useRouter()





    const loginHandle = async (values) => {





        try {



            const { username, password } = values

            const data = await signIn("credentials", { username: username, password: password, callbackUrl: 'http://localhost:3000/dashboard' })


            if(data?.status === 200){
                toast.success('Hold up,You are redirecting to dashboard ')
                router.replace('/dashboard');
        
              }
              
              else{
                router.push('/login')
              }
        } catch (error) {
            console.log(error.message)

        }


    }





    return (
        <div className="min-h-screen bg-[#F2F5FC] flex items-center  justify-center">
            <div className="bg-white h-[32rem]  flex drop-shadow-xl rounded-[0.375rem]">
                <div className="  hidden bg-white  items-center justify-center">
                    <img src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?size=626&ext=jpg&ga=GA1.2.1692727730.1678336007&semt=sph" className="max-h-full max-w-full object-contain" alt="image" />
                </div>
                <div className="laptop:w-1/2 bg-red-800 rounded-xl drop-shadow-lg p-6">
                    <h1 className="text-4xl pl-1 pt-4 pb-4 text-white">Login</h1>
                    <p className=" text-white p-1 pb-7">If you are already member, easy login</p>

                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={loginValidationSchema}
                        onSubmit={loginHandle}
                    >
                        <Form >



                            <InputCred
                                label="Username"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="username"
                            // value={data.username}
                            // onChange={(e) => onValueChange(e)} 
                            />


                            <InputCred
                                label="Password"
                                type="text"
                                id="password"
                                name="password"
                                placeholder="password"
                            // value={data.password}
                            // onChange={(e) => onValueChange(e)} 
                            />




                            <button type="submit" className="bg-black   w-full h-12 text-white hover:bg-gray-700 py-2 px-4 rounded-full">Sign Up</button>
                        </Form>

                    </Formik>
                    <Toaster />

                    {/* <div className=" text-gray-200 p-5 text-center">
            <p >Don't have an account?</p>
            <Link href="/signup" className="hover:underline  text-black ">SignUp</Link>
          </div> */}

                </div>
            </div>
        </div>
    );
};

export default Login;