"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Username = () => {
  const param = useParams();
  const [username, setUsername] = useState();
  const [tovar, setToVar] = useState('for');
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    setUsername(param.username);
    const toarr = ['for', 'to'];
    setTimeout(() => {
      const currentIndex = toarr.indexOf(tovar);
      const incIndex = (currentIndex + 1) % toarr.length;
      setToVar(toarr[incIndex]);
    }, 2000);
  }, [tovar]);

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
      <div className="min-h-screen bg-white w-full">
        <div className="p-10">
          <p className="text-4xl m-4 text-center font-bold">This is the Public Profile</p>
          <p className="text-2xl font-bold">{tovar} {username}...</p>
        </div>
        <div className="m-3">
          <p className="text-center text-[16px]">Anonymous Feedback to <span className="font-bold">@{username}</span></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-green-400 mx-[20rem] h-[12rem]">
            <Input className="w-full h-full" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </div>
          <div className="text-center m-3">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default Username;