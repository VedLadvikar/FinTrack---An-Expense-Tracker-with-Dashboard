import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        return res.status(400).json({
            success: false,
            message: firstError,
        });
    }
    next();
};

const registerRules = [
    body("name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    validate,
];

const loginRules = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required"),
    validate,
];

const transactionRules = [
    body("amount")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be a positive number"),
    body("type")
        .isIn(["income", "expense"])
        .withMessage("Type must be either income or expense"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),
    body("date")
        .isISO8601()
        .withMessage("Please enter a valid date"),
    validate,
];

const profileRules = [
    body("name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email"),
    validate,
];

export { registerRules, loginRules, transactionRules, profileRules };
