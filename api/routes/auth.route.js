import express from "express";
import { Signin } from "../controller/controller.auth.js";

const router = express.Router();

router.post("/signin", Signin);

export default router;
