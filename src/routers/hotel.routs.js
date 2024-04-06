import { Router } from "express"
import {
  createHotel,
  getHotelByName,
  updateHotelImage,
} from "../controllers/hotel.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middeleware.js"
const router = Router()
router.route("/createHotel").post(verifyJWT, createHotel)
router.route("/hotelByName").get(verifyJWT, getHotelByName)
router
  .route("/hotelImage/:id")
  .patch(verifyJWT, upload.single("image"), updateHotelImage)
export default router
