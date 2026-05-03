import express from "express";
import { bookAppointment, getUserAppointments } from "../controllers/appointmentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// BOOK APPOINTMENT
router.post("/book", authMiddleware, bookAppointment);
// GET LIST
router.get("/list", authMiddleware, getUserAppointments);

export default router;
