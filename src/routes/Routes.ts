import express from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";
import MasterMenuController from "../controllers/MasterMenuController";
import SubMenuController from "../controllers/SubMenuController";

import MenuValidation from "../middleware/validation/MenuValidation";
import RoleMenuAccessController from "../controllers/RoleMenuAccessController";

const router = express.Router();

// router.get("/role", Authorization.Authenticated, RoleController.GetRole);
router.get("/role", Authorization.Authenticated, Authorization.BasicUsers, RoleController.GetRole);
router.post("/role", Authorization.Authenticated, Authorization.AdminRoles, RoleController.CreateRole);
router.post("/role/:id",  Authorization.Authenticated, Authorization.AdminRoles, RoleController.UpdateRole);
router.delete("/role/:id", Authorization.Authenticated, Authorization.SuperUsers, RoleController.DeleteRole);
router.patch("/role/:id",  Authorization.Authenticated, Authorization.BasicUsers, RoleController.GetRoleById);

// router.get("users", RoleController.GetUsers);
router.post("/users/register", UserValidation.RegisterValidation, UserController.Register);
router.post("/users/login", UserValidation.LoginValidation, UserController.UserLogin)
router.get("/users/refresh-token", UserController.refreshToken);
router.get("/users/current-user", Authorization.Authenticated, UserController.UserDetail);
router.get("/users/logout", Authorization.Authenticated, UserController.UserLogout);


router.post("/menu", MenuValidation.CreateMasterMenuValidation, Authorization.Authenticated, Authorization.AdminRoles, MasterMenuController.CreateMenu);
router.get("/menu", Authorization.Authenticated, Authorization.AdminRoles, MasterMenuController.GetListMenu);
router.get("/menu/all", Authorization.Authenticated, Authorization.AdminRoles, MasterMenuController.GetAllMenu);
router.get("/menu/:id", Authorization.Authenticated, Authorization.AdminRoles, MasterMenuController.GetDetailMenu);
router.patch("menu/:id", MenuValidation.CreateMasterMenuValidation, Authorization.Authenticated, Authorization.AdminRoles, MasterMenuController.UpdateMenu);
router.delete("/menu/:id", Authorization.Authenticated, Authorization.AdminRoles, MasterMenuController.SoftDeleteMenu);
router.delete("/menu/permanent/:id", Authorization.Authenticated, Authorization.AdminRoles, MasterMenuController.DeletePermanent);

router.post("/sub-menu", MenuValidation.CreateSubMenuValidation, Authorization.Authenticated, Authorization.AdminRoles, SubMenuController.CreateSubMenu)
router.get("/sub-menu", Authorization.Authenticated, Authorization.AdminRoles, SubMenuController.GetListSubMenu)
router.get("/sub-menu/all", Authorization.Authenticated, Authorization.AdminRoles, SubMenuController.GetAllSubMenu)
router.get("/sub-menu/:id", Authorization.Authenticated, Authorization.AdminRoles, SubMenuController.GetDetailSubMenu)
router.patch("/sub-menu/:id", MenuValidation.CreateSubMenuValidation, Authorization.Authenticated, Authorization.AdminRoles, SubMenuController.UpdateSubMenu)
router.delete("/sub-menu/:id", Authorization.Authenticated, Authorization.AdminRoles, SubMenuController.SoftDeleteSubMenu)
router.delete("/sub-menu/permanent/:id", Authorization.Authenticated, Authorization.AdminRoles, SubMenuController.DeletePermanentSubMenu)


router.post("/role-menu-access", Authorization.Authenticated, Authorization.SuperUsers, RoleMenuAccessController.CreateAccess)
router.get("/role-menu-access", Authorization.Authenticated, Authorization.SuperUsers, RoleMenuAccessController.GetListAccess)
router.get("/role-menu-access/get/all", Authorization.Authenticated, Authorization.SuperUsers, RoleMenuAccessController.GetAllAccess)
router.get("/role-menu-access/:id", Authorization.Authenticated, Authorization.SuperUsers, RoleMenuAccessController.GetDetailAccess)
router.patch("/role-menu-access/:id", Authorization.Authenticated, Authorization.SuperUsers, RoleMenuAccessController.UpdateAccess)
router.delete("/role-menu-access/:id", Authorization.Authenticated, Authorization.SuperUsers, RoleMenuAccessController.SoftDeleteAccess)
router.delete("/role-menu-access/permanent/:id", Authorization.Authenticated, Authorization.SuperUsers, RoleMenuAccessController.DeletePermanentAccess)


export default router;
