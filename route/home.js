import express from "express";
import defaultHandler from "../home/defaultHandler.js";

const router = express.Router();

router.post("/", defaultHandler);

export default router;
