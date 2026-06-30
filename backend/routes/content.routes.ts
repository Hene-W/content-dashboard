import {Router} from "express"
import { createContent, deleteContent, getAllContent, getContentById, updateContent } from "../controllers/content.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { createValidator, idValidator, updateValidator } from "../validators/content.validator"

const router = Router()

router.post("/", authMiddleware, createValidator, createContent)
router.get("/", authMiddleware, getAllContent)
router.get("/:id", authMiddleware, idValidator, getContentById)
router.patch("/:id", authMiddleware, idValidator, updateValidator, updateContent)
router.delete("/:id", authMiddleware, idValidator, deleteContent)

export default router