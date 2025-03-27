import { User } from "../model/user.model.js";
import { appError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // const token =
    //   req.cookies?.accessToken ||
    //   req.header("Authorization")?.replace("Bearer ", "");

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new appError(401, "unauthorized request.");

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) throw new appError(401, "invalid access token.");

    req.user = user;

    next();
  } catch (error) {
    throw new appError(401, error?.message || "Invalid access token.");
  }
});
