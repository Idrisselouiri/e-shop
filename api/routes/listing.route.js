import express from "express";
import {
  CreateListing,
  DeleteListing,
  GetListings,
  UpdateListing,
  GetListing,
  GetListingsSearch,
} from "../controller/controllerListing.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/createListing", verifyUser, CreateListing);
router.get("/getListings/:id", verifyUser, GetListings);
router.delete("/deleteListing/:id", verifyUser, DeleteListing);
router.post("/updateListing/:id", verifyUser, UpdateListing);
router.get("/getListing/:id", GetListing);
router.get("/get", GetListingsSearch);

export default router;
