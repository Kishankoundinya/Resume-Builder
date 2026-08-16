import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>(console.log("Database connected succesfully")))
        
        let mongodbURI=process.env.MONGODB_URI;
        const projectName="Resume_Builder";
  
        if(!mongodbURI){
            throw new Error("MONGODB_URI enviroment variable and not set")
        }

        if(mongodbURI.endsWith('/')){
            mongodbURI=mongodbURI.slice(0,-1)
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)
    } catch (error) {
        console.error("Error connecting to MongoDB ",error)
        
    }
}

export default connectDB;