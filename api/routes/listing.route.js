import express from "express";
import { CreateListing } from "../controller/controllerListing.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/createListing", verifyUser, CreateListing);

export default router;
