import { Router } from "express"
import {
  logOut,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()
router.route("/registerUser").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logOut)
export default router
