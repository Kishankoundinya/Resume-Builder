import express from "express";
import { getUserById, getUserResume, loginUser, registerUser } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";


const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUserUser);
userRouter.get('/data',protect,getUserByIdUser);
userRouter.get('/resumes',protect,getUserResume)


export default userRouter;