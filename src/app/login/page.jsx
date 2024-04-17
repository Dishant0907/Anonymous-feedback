


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

            const data = await signIn("credentials", { username: username, password: password, callbackUrl: '/dashboard' })
            console.log("print",data)

            router.push('/dashboard')

            if(data?.status === 200){
                toast.success('Hold up,You are redirecting to dashboard ')
                router.push('/dashboard');
        
              }
              
              
        } catch (error) {
            console.log(error.message)

        }


    }





    return (
        <div className="min-h-screen bg-[#F2F5FC] flex items-center  justify-center">
            <div className="bg-white h-[32rem]  flex drop-shadow-xl rounded-[0.375rem]">
                
                <div className=" bg-[#F7DCB9] rounded-xl drop-shadow-lg p-6">
                    <h1 className="text-4xl text-[#754c22] pl-1 pt-4 pb-4 ">Login</h1>
                    <p className=" text-[#754c22] p-1 pb-7">If you are already member, easy login</p>

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




                            <button type="submit" className="bg-[#754c22]   w-full h-12 text-white hover:bg-gray-700 py-2 px-4 rounded-full">Login</button>
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