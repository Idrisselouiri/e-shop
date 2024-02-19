import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  deleteUser,
  listingUser,
  updateUser,
} from "../controller/controller.user.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);

export default router;
