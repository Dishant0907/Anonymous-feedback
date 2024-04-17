"use client"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { IoCopy } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import { BsPersonSquare } from "react-icons/bs";
import { RiChatDeleteFill } from "react-icons/ri";

import { ScrollArea } from "@/components/ui/scroll-area"
import AlertDeleteFeedBack from "../componentsMine/AlertDeleteFeedBack";
import { CiLogout } from "react-icons/ci";
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { GrSystem } from "react-icons/gr";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"

const Dashboard = () => {
    const router = useRouter()



    const [userEmail, setUserEmail] = useState()

    const [username, setUserName] = useState();
    const greetings = ['Namaste!', 'Welcome!',  'Wassup!']
    const [greet, setGreet] = useState('Namaste!');
    const [userUrl, setUserUrl] = useState('');
    const [feedback, setFeedBack] = useState([])
    const [isAcceptingMessage, setIsAcceptingMessage] = useState();
    const [copyIconSize, setCopyIconSize] = useState('18')
    const [isLoading, setIsLoading] = useState(true)
    

    const [updateFeedbackTrigger,setUpdateFeedbackTrigger] = useState(false)

    const checkedChange = async (checked) => {
        // here the values in user db will alter with switch
        console.log("bha", checked)
        const response = await axios.put('/api/updatingAcceptingMessage', { checked })
        setIsAcceptingMessage(checked);

        if (checked === true) {
            toast.success("Feedback on")
        }
        else {
            toast.success("Feedback off")
        }

    }

   

    const handleSignOut = async () => {
        await signOut({ redirect: false })
        router.push("/login")


    }




    const handleCopy = async (userUrl) => {
        try {
            await navigator.clipboard.writeText(userUrl);
            setCopyIconSize('15')
            setTimeout(() => {
                setCopyIconSize('18')
            }, 200)
            toast.success('Copied to your clipboard')
        } catch (error) {
            toast.error("Could'nt Copy")
        }
    }
    useEffect(() => {

        (async () => {
            const response = await axios.get('/api/userData')
            setIsLoading(false)
            setUserName(response?.data?.currentUser?.username);
            setFeedBack(response?.data?.allFeedback);
            setIsAcceptingMessage(response?.data?.currentUser?.isAcceptingMessage)
            const tailUrl = response?.data?.currentUser?.username
            const baseUrl = process.env.BASE_URL || 'https://anonymous-feedback-five.vercel.app';
            setUserUrl(`${baseUrl}/user/${tailUrl}`);

        })()

    }, [updateFeedbackTrigger])

    const reversedFeedback = feedback.slice().reverse();

    useEffect(() => {
        setTimeout(() => {
            const currentIndex = greetings.indexOf(greet)
            const incIndex = (currentIndex + 1) % greetings.length
            setGreet(greetings[incIndex])

        }, 3000)
    }, [greet])


    // setTimeout(()=>{
    //     setGreet('Namaste');
    //     setGreet('pela')

    // },2000)
    return (
        <>
            <div className="  bg-[#F7DCB9] w-full min-h-screen   ">
                <div className="flex justify-between">
                    <div className="ml-[2rem] pt-[4rem] laptop:ml-[4rem] laptop:pt-[2rem] ">
                        <p className="text-4xl  laptop:text-5xl font-semibold text-[#754c22] ">{greet}, {username}...</p>
                    </div>
                    <div className=" m-2 ml-[3rem] laptop:mt-[2rem] laptop:mr-[5rem] laptop:p-1 laptop:px-2 laptop:pb-1 cursor-pointer ">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className="bg-[#F7DCB9] text-[#754c22]" onClick={handleSignOut} variant="outline"><CiLogout size={24} />
                                    </Button>

                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Logout</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>
                </div>
                <div className="mt-6 text-center" >
                    <Switch id="accepting-messages"
                        checked={isAcceptingMessage}

                        onCheckedChange={checkedChange} />
                </div>

                <div className="text-center text-[#754c22]">
                    <Label htmlFor="accepting-messages ">Accepting Messages</Label>
                </div>


                <div className=" p-3 laptop:mt-12 w-full laptop:h-14 laptop:py-3 laptop:px-[30rem] " >
                    <div onClick={() => handleCopy(userUrl)} className="h-[3.7rem] laptop:h-9 border border-[#DEAC80] hover:bg-[#B99470] rounded-md p-2  pl-4 flex justify-between cursor-copy ">
                        <p>{userUrl}</p>



                        <div className="hover:text-gray-500 hover:shadow-lg text-[#754c22]">
                            <IoCopy size={copyIconSize} />

                        </div>
                    </div>

                </div>

                {/* this is message card */}
                <p className="ml-[3rem] mt-[3rem] laptop:ml-[10rem] text-2xl laptop:mt-7 text-[#754c22] font-bold">Anonymous Feedback...</p>
                <div className="p-3 bg-[#F7DCB9] h-[28rem] w-full laptop:mt-4  laptop:h-[32rem] laptop:px-[10rem]">
                    <ScrollArea className="h-full w-full rounded-md border">
                        <div className="h-full w-full bg-[#F7DCB9] border border-[#DEAC80] rounded-lg grid laptop:grid-cols-2 gap-4 p-3 overflow-auto    ">

                            {isLoading ? (<div className="bg-[#F7DCB9] h-auto w-full rounded-lg flex">
                                <div className="m-4 text-[#754c22]">
                                    <Skeleton><BsPersonSquare size={64} /></Skeleton>


                                </div>
                                <div className="m-1 pt-2 pl-2 laptop:m-4  laptop:pt-2 laptop:pl-3  laptop:min-w-[35rem] shadow-md rounded-lg flex justify-between">
                                    <div className="w-full">
                                        <Skeleton className="text-[16px] text-[#754c22] w-full pb-3" />
                                           
                                        
                                        <Skeleton className="text-[16px] text-[#754c22] "/>
                                    </div>
                                    <div className="p-3 text-[#754c22] cursor-pointer">
                                        <RiChatDeleteFill size={24} />


                                    </div>

                                </div>
                            </div>) :

                                feedback.length === 0 ? (<div className="bg-[#F7DCB9] h-auto w-full rounded-lg flex">
                                    <div className="m-1 mt-4 laptop:m-4 text-[#754c22]">
                                        <GrSystem  size={64} />


                                    </div>
                                    <div className="m-1 pt-2 pl-2 laptop:m-4  laptop:pt-2 laptop:pl-3  laptop:min-w-[35rem] shadow-md rounded-lg flex justify-between">
                                        <div>
                                            <p className="text-[16px] text-[#754c22] pb-3">There is no feedback yet from real person. <span className="font-bold">But you are awesome</span></p>
                                            <p className="text-[12px] text-[#754c22]">
                                                Messaged at {new Intl.DateTimeFormat('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                }).format(new Date())}
                                            </p>
                                        </div>
                                        <div className="p-3 text-[#754c22] cursor-pointer">
                                            <RiChatDeleteFill size={24} />


                                        </div>

                                    </div>
                                </div>) : (
                                    reversedFeedback.map((singleFeedback) => (
                                        <div key={singleFeedback._id} className="bg-[#F7DCB9] h-auto w-full rounded-lg flex">
                                            <div className="m-1 mt-4 laptop:m-4 text-[#754c22]">
                                                <BsPersonSquare size={64} />


                                            </div>
                                            <div className="m-1 pt-2 pl-2 laptop:m-4  laptop:pt-2 laptop:pl-3  laptop:min-w-[35rem] shadow-md rounded-lg flex justify-between">
                                                <div>
                                                    <p className="text-[16px] text-[#754c22] pb-3">{singleFeedback.feedback}</p>
                                                    <p className="text-[12px] text-[#754c22]">
                                                        Messaged at{' '}
                                                        {new Intl.DateTimeFormat('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true,
                                                        }).format(new Date(singleFeedback.createdAt))}
                                                    </p>                                            </div>
                                                <div className="p-3 text-[#754c22] cursor-pointer " >
                                                    <AlertDeleteFeedBack updateFeedbackTrigger={updateFeedbackTrigger} setUpdateFeedbackTrigger={setUpdateFeedbackTrigger}  singleFeedback={singleFeedback._id}/>



                                                </div>

                                            </div>
                                        </div>
                                    )))
                            }

                            {/* <div className="bg-white h-auto w-full rounded-lg flex">
                                <div className="m-4">
                                    <BsPersonSquare size={64} />


                                </div>
                                <div className="m-4  pt-2 pl-3  min-w-[35rem] shadow-md rounded-lg flex justify-between">
                                    <div>
                                        <p className="text-[16px] pb-3">Hello</p>
                                        <p className="text-[12px]"> Messaged at 3.20pm</p>
                                    </div>
                                    <div className="p-3">
                                        <RiChatDeleteFill size={24} />


                                    </div>

                                </div>
                            </div> */}




                        </div>
                    </ScrollArea>
                </div>
                <Toaster />

            </div>
        </>
    )
}

export default Dashboard