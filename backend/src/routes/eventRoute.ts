import { Router } from "express";
import { createEvent, getEvent, updateEvent, deleteEvent } from "../controllers/eventController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/event", authenticateToken, createEvent);
router.get("/event", authenticateToken, getEvent);
router.put("/event/:id", authenticateToken, updateEvent);
router.delete("/event/:id", authenticateToken, deleteEvent);

export default router;