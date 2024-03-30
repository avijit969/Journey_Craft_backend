import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body
 console.log(fullName,email,username,password);
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  })
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
  }
  const user = await User.create({
    email,
    fullName,
    password,
    username,
  })
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"))
})

export { registerUser }
