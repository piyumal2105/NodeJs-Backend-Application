import express from "express";
import {
  createUser,
  updateLocation,
  getUserWetherData,
} from "../controllers/user.controller.js";

const router = express.Router();

// Routes
router.post("/user", createUser);
router.put("/user/:email/location", updateLocation);
router.get("/user/:email/weather", getUserWetherData);

export default router;
