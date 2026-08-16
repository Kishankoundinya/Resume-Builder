import jwt from "jsonwebtoken";
import User from "./models/User.js";
import bcrypt from 'bcrypt';
import Resume from "../models/resume.js";

const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: '7d'})
    return token;
}


// controller for user reegistration
// POST:/api/users/register
export const registerUser=async(req,res)=>{
        try {
            const {name,email,password}=req.body;

            // check if rquired files are present or not
            if(!name || !email || !password){
                return res.status(400).json({message:'missing require fields'})
            }

            const user=await User.findOne({email})
            if(user){
                return res.status(400).json({message:'user already exists'})
            }

            // create new user 
            const hashedPassword=await bcrypt.hash(password,10)
            const newUser=await User.create({
                name,email,password:hashedPassword
            })

            // return succes message
            const token=generateToken(newUser._id)
            newUser.password=undefined;

            return res.status(201).json({message:'user created successfully',token,user:newUser})



        } catch (error) {
            return res.status(201).json({message:error.message})   
        }
}

// controller for user login 
// POST:/api/users/login

export const loginUser=async(req,res)=>{
        try {
            const {email,password}=req.body;

          

            const user=await User.findOne({email})
            if(!user){
                return res.status(400).json({message:'Invalid email or password'})
            }
            // check if password is correct 
            if(!user.comparePassword(password)){
                return res.status(400).json({message:'Invalid email or password'})
            }


            // return succes message
            const token=generateToken(user._id)
            user.password=undefined;

            return res.status(200).json({message:'Login successful',token,user})



        } catch (error) {
            return res.status(400).json({message:error.message})   
        }
}

/// controller for getting user by id

// GET:/api/users/data

export const getUserById=async(req,res)=>{
        try {
          
            const userId=req.userId;

            // check if user exists
            const user=await User.findById(userId)
            if(!user){
                return res.status(404).json({message:"user not found"})   
            }

            //return user
            user.password=undefined;
            return res.status(200).json({user})
           

            return res.status(400).json({message:error.message})



        } catch (error) {
            return res.status(400).json({message:error.message})   
        }
}

//controller for getting user resume
// GET: /api/users/resumes
export const getUserResume=async(req,res)=>{
    try {
        const userId=req.userId;

        //return user resume
        const resumes=await Resume.find({userId})
        return res.status(200).json({resumes})
    } catch (error) {
          return res.status(400).json({message:error.message})  
    }
}


