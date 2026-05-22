import express from "express";
import {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
} from "../controller/transactionController.js";
import authMiddleware from "../middleware/auth.js";
import { transactionRules } from "../middleware/validators.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTransactions);
router.post("/", transactionRules, addTransaction);
router.put("/:id", transactionRules, updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
