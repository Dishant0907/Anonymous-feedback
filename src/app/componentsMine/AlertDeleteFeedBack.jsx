import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import axios from "axios";
  import { RiChatDeleteFill } from "react-icons/ri";
  import toast, { Toaster } from 'react-hot-toast';


  
const AlertDeleteFeedBack = ({updateFeedbackTrigger,setUpdateFeedbackTrigger,singleFeedback}) => {


    const deleteFeedbackId = singleFeedback
    const handleDelete = async() => {
        try {
            console.log("hello",deleteFeedbackId)
            const response = await axios.delete(`/api/deleteFeedback/deleteFeedback?delete=${deleteFeedbackId}`)
            if(response?.data?.status === true){
                toast.success("Feedback deleted Successfully");
                setUpdateFeedbackTrigger(prev =>!prev)
                
            }
            else{
                toast.error("Not deleted,Something wrong")
            }
        } catch (error) {
            console.log(error.message)
        }
      }

      
    return (
        <>
        <AlertDialog>
      <AlertDialogTrigger asChild>
      <RiChatDeleteFill size={24} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Feedback  from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction  onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

        <Toaster/>

    </>

    

    )
}

export default AlertDeleteFeedBack;