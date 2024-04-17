

import nodemailer from "nodemailer"




export const sendEmail = async (email,verifiedCode) => {


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
          user: 'trydishant2002@gmail.com', // Your Gmail address
          pass: '' // Your Gmail password (preferably use environment variables)
        }
      });
    
      const mailOptions = {
        from: 'trydishant2002@gmail.com', // Sender address
        to: email, // List of recipients
        subject: 'Verifyication', // Subject line
        text: ` Your OTP is ${verifiedCode}, Paste it and there you go😊`, // Plain text body
      };


    

    






    
 

    


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
          
        } else {
          console.log('Email sent:', info.response);
          
        }
    
        
      });

    
      
}