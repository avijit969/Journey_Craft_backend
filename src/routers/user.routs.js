import { Router } from "express"
import {
  logOut,
  loginUser,
  registerUser,
  updateAvatar,
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middeleware.js"
const router = Router()
router.route("/registerUser").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logOut)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar)
export default router
