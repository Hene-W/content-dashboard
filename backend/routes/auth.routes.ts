import {Router} from "express"
import { changePassword, getMe, login, logout, updateEmail } from "../controllers/auth.controller"
import { changePasswordValidator, loginValidator, updateEmailValidator } from "../validators/auth.validator"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

router.post("/login", loginValidator, login)
router.post("/logout", logout)
router.get("/me", authMiddleware, getMe)
router.patch("/updateEmail", authMiddleware, updateEmailValidator, updateEmail)
router.patch("/changePassword", authMiddleware, changePasswordValidator, changePassword)

export default router