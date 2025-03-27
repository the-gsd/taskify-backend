import { Router } from "express";
import { loginUser, signUpUser } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.route("/signUp").post(signUpUser);
userRouter.route("/login").post(loginUser);

export { userRouter };
