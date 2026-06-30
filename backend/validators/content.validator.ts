import {body, param} from "express-validator"

export const createValidator = [
    body("title").notEmpty().withMessage("Title is required").isLength({max: 100}).withMessage("Title must be less than 100 characters"),
    body("description").optional().isLength({max: 500}).withMessage("Description must be less than 500 characters"),
    body("platform").notEmpty().withMessage("Platform is required").isIn(["YouTube", "Instagram", "TikTok", "Facebook", "Twitter", "Blog"]).withMessage("Invalid platform"),
    body("status").optional().isIn(["à faire", "en cours", "publié"]).withMessage("Invalid status"),
    body("scheduledDate").optional().isISO8601().toDate().withMessage("Invalid date format"),
]

export const updateValidator = [
    body("title").optional().isLength({max: 100}).withMessage("Title must be less than 100 characters"),
    body("description").optional().isLength({max: 500}).withMessage("Description must be less than 500 characters"),
    body("platform").optional().isIn(["YouTube", "Instagram", "TikTok", "Facebook", "Twitter", "Blog"]).withMessage("Invalid platform"),
    body("status").optional().isIn(["à faire", "en cours", "publié"]).withMessage("Invalid status"),
    body("scheduledDate").optional().isISO8601().toDate().withMessage("Invalid date format"),
]

export const idValidator = [
    param("id").isMongoId().withMessage("Invalid content ID")
]