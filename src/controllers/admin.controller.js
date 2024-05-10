import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
  
      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })
  
      return { accessToken, refreshToken }
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating refresh and access token"
      )
    }
  }
const registerAdmin = asyncHandler(async (req, res) => {
  const { fullName, email, username, password,adminType,isAdmin } = req.body
  console.log(fullName, email, username, password)
  if (
    [fullName, email, username, password,adminType].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  })
  if (existedUser) {
    throw new ApiError(401, "Admin with email already exists")
  }
  const user = await User.create({
    email,
    fullName,
    password,
    username,
    isAdmin,
    adminType
  })
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "Admin registered Successfully"))
})

// admin login  ✅
const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      throw new ApiError(400, "Username and Password is required !")
    }
    const user = await User.findOne({ username })
    if (!user) {
      throw new ApiError(401, "user does not exist !")
    }
    if(!user.isAdmin){
        throw new ApiError(403, "user is not an admin !")
    }
    const isPAsswordCorrect = await user.isPasswordCorrect(password)
    if (!isPAsswordCorrect) {
      throw new ApiError(402, "invalid user credentials")
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    )
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )
    const options = {
      httpOnly: true,
      secure: true,
    }
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "admin logged in successfully"
        )
      )
  })


// admin logOut ✅
const AdminLogOut = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    )
    const options = {
      httpOnly: true,
      secure: true,
    }
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "user logged Out"))
  })

export {registerAdmin,AdminLogOut,loginAdmin}
