import express from "express";
import rateLimit from "express-rate-limit";
import { sendContactEmail } from "../controllers/index.js";

const router = express.Router();


const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again later.",
});

router.post("/contact", contactLimiter, sendContactEmail);

export default router;
