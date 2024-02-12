import express from "express";
import { signin } from "../controller/controller.auth.js";
const router = express.Router();

router.post("/signin", signin);

export default router;
