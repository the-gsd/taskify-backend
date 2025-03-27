import { User } from "../model/user.model.js";
import { appError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

export const signUpUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (
    [name, email, password].some(
      (field) => field?.trim() === "" || field === undefined
    )
  ) {
    throw new appError(400, "name, email and password is required.");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser)
    throw new appError(400, "user with given email already exists.");

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user)
    throw new appError(500, "something went wrong while creating user.");
  console.log(user);

  user.password = undefined;
  //   delete user.password
  const accessToken = user.generateAccessToken();

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        { ...user._doc, accessToken },
        "user created successfully."
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new appError(400, "email and password is required.");

  const existedUser = await User.findOne({ email });

  if (!existedUser) throw new appError(404, "user not exists with give email.");

  const isPasswordCorrect = await existedUser.isPasswordCorrect(password);

  if (!isPasswordCorrect) throw new appError(400, "incorrect password.");

  existedUser.password = undefined;

  const accessToken = existedUser.generateAccessToken();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { ...existedUser._doc, accessToken },
        "user logged in successfully."
      )
    );
});
