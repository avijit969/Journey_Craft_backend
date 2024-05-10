import { Router } from "express"
import {
  AdminLogOut,
  loginAdmin,
  registerAdmin,
} from "../controllers/admin.controller.js"
const router = Router()
router.route("/registerAdmin").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/logout").post(AdminLogOut)
export default router
