import express from "express";
import RoleController from "../controllers/RoleController";
const router = express.Router();

router.get("/role", RoleController.GetRole)



export default router;
