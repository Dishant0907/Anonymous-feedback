"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const Username = () => {
  const param = useParams();
  const [username, setUsername] = useState();
  const [tovar, setToVar] = useState('for');
  const [feedback, setFeedback] = useState('');

  const router = useRouter()

  useEffect(() => {
    setUsername(param.username);
    const toarr = ['for', 'to'];
    setTimeout(() => {
      const currentIndex = toarr.indexOf(tovar);
      const incIndex = (currentIndex + 1) % toarr.length;
      setToVar(toarr[incIndex]);
    }, 2000);
  }, [tovar]);

  const handleToSignup = () => {
    console.log('good');
    router.push('/signUp')
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sendFeedback', { username, feedback });
      
      if (response?.data?.success === true) {
        toast.success("Message Sent Successfully");
        setFeedback('')
        
      } 
      else if(response?.data?.message=== "User not found"){
        toast.error("User not found")
      }

      else if(response?.data?.message === "not accepting Feedback"){
        toast.error("User not Accepting Feedback anymore")
      }
      
      else {
        toast.error("Something Wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F7DCB9] w-full">
        <div className="p-10">
          <p className="text-4xl text-[#754c22] m-2 mb-8 laptop:m-4 text-center font-bold">This is the Public Profile</p>
          <p className="text-2xl text-[#754c22]   font-bold">{tovar} {username}...</p>
        </div>
        <div className="m-3">
          <p className="text-center text-[#754c22] text-[16px]">Anonymous Feedback to <span className=" text-[#754c22]  font-bold">@{username}</span></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" mx-[1rem] h-[13rem] laptop:mx-[20rem] laptop:h-[12rem]">
            <Input className="w-full bg-[#f0e6da] h-full text-[#754c22]" placeholder="Message for  here..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </div>
          <div className="text-center m-3">
            <Button className="bg-[#754c22]" type="submit">Send</Button>
          </div>
        </form>
        <div className="text-center" onClick={handleToSignup}>
          <p className="mt-[7rem] text-center text-[#754c22] mb-4 font-bold">Wanna Create Account?</p>
          <button className="bg-[#754c22] p-2 rounded-md shadow-sm shadow-black text-white"  >Sign up</button>
          
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Username;