import { Router } from "express"
import {
  createHotel,
  getAllHotel,
  getHotelByName,
  updateHotelImage,
} from "../controllers/hotel.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middeleware.js"
import { verifyAdmin } from "../middlewares/auth.admin.js"
const router = Router()
router.route("/createHotel").post(verifyAdmin, createHotel)
router.route("/hotelByName").get(verifyJWT, getHotelByName)
router.route("/allHotel").get( getAllHotel)
router
  .route("/hotelImage/:id")
  .patch(verifyJWT, upload.single("image"), updateHotelImage)
export default router
