import express from "express";
import { Signin, Login } from "../controller/controller.auth.js";

const router = express.Router();

router.post("/signin", Signin);
router.post("/login", Login);

export default router;
