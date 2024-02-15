import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { updateUser } from "../controller/controller.user.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);

export default router;
