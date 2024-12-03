import express from "express";
import { registerUser, userLogin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/registeruser", registerUser);
router.post("/userlogin", userLogin);

export default router;
