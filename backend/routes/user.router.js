import express from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/registeruser", registerUser);

export default router;
