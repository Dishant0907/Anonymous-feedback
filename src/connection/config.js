import mongoose from "mongoose";

const Connection = async () => {
    try {
        await mongoose.connect("mongodb+srv://dishant:Sol2ZZsQjdh6PQWi@cluster0.okhrprr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{useUnifiedTopology:true});
        console.log("db connected")
    } catch (error) {
        console.log("db not connected",error.message);
        
    }
}



export default Connection;  