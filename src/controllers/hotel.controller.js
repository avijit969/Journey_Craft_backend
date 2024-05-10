import { Hotel } from "../models/hotel.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Create hotel ✅
const createHotel = asyncHandler(async (req, res) => {
  const { name, location, description, facilities, roomTypes } = req.body
  // Validate required fields
  if ([name, location, description].some((field) => !field?.trim())) {
    throw new ApiError(
      400,
      "Name, location, and description fields are required"
    )
  }
  // Check if hotel with the same name already exists
  const existedHotel = await Hotel.findOne({ name })
  if (existedHotel) {
    throw new ApiError(
      409,
      "Hotel name already exists, please try another name"
    )
  }
  // Create new hotel document
  const hotel = await Hotel.create({
    name,
    location,
    description,
    facilities,
    roomTypes,
    owner: req.user._id,
  })
  return res
    .status(201)
    .json(new ApiResponse(201, hotel, "Hotel created successfully"))
})
// update hotel image ✅
const updateHotelImage = asyncHandler(async (req, res) => {
  const { id } = req.params

  const hotelImageLocalPath = req.file?.path
  if (!hotelImageLocalPath) {
    throw new ApiError(400, "Hotel image file is missing")
  }
  const hotelImage = await uploadOnCloudinary(hotelImageLocalPath)
  if (!hotelImage.url) {
    throw new ApiError(400, "Error while uploading hotel image")
  }
  const hotel = await Hotel.findByIdAndUpdate(
    id,
    {
      $set: {
        image: hotelImage.url,
      },
    },
    { new: true }
  )
  return res
    .status(200)
    .json(new ApiResponse(200, hotel, "hotel image is updated successfully"))
})

// get hotel details by name ✅
const getHotelByName = asyncHandler(async (req, res) => {
  const { hotelName } = req.body
  const hotel = await Hotel.findOne({ name: hotelName })
  
  if (!hotel) {
    throw new ApiError(401, "hotel not found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, hotel, "successfully got the hotel information"))
})

//get all hotels
const getAllHotel = asyncHandler(async (req, res) => {
  const { hotelName } = req.body
  const hotel = await Hotel.find()
  
  if (!hotel) {
    throw new ApiError(401, "hotel not found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, hotel, "successfully got all the hotel information"))
})

export { createHotel, updateHotelImage,getHotelByName,getAllHotel }
