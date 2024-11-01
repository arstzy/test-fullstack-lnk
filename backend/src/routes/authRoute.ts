import { Router } from "express";
import { login, register, logout } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authenticateToken, logout);

export default router;