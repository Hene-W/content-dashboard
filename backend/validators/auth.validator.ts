import {body} from "express-validator"

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[A-Z])(?=.*[0-9])/)
        .withMessage("Password must contain at least one uppercase letter and one number")
]

export const updateEmailValidator = [
    body("email").isEmail().withMessage("Invalid email address")
]

export const changePasswordValidator = [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required").isLength({min: 6}).withMessage("New password must be at least 6 characters long")
        .matches(/^(?=.*[A-Z])(?=.*[0-9])/)
        .withMessage("New password must contain at least one uppercase letter and one number")
]