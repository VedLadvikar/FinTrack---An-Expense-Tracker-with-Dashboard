import express from "express";
import { exportReport } from "../controller/reportController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/export", authMiddleware, exportReport);

export default router;
