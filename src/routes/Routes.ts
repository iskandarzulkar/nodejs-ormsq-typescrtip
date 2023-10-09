import express from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router.get("/role", Authorization.Authenticated, RoleController.GetRole);
router.post("/role", RoleController.CreateRole);
router.post("/role/:id", RoleController.UpdateRole);
router.delete("/role/:id", RoleController.DeleteRole);
router.patch("/role/:id", RoleController.GetRoleById);

// router.get("users", RoleController.GetUsers);
router.post("/users/register", UserValidation.RegisterValidation, UserController.Register);
router.post("/users/login", UserValidation.LoginValidation, UserController.UserLogin)

export default router;
