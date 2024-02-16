import express from "express";
import {
  Signin,
  Login,
  Google,
  Signout,
} from "../controller/controller.auth.js";

const router = express.Router();

router.post("/signin", Signin);
router.post("/login", Login);
router.post("/google", Google);
router.get("/signout", Signout);

export default router;
