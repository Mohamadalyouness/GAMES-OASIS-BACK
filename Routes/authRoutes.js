import express from "express";
import  * as UserController  from "../Controllers/UsersControllers.js";
import auth from "../Middleware/auth.js"
const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/getUser", auth,UserController.getUsers);
router.get("/getUser/:id",auth,UserController.getUserById);
router.delete("/deleteUser/:id", auth,UserController.deleteUser);

export default router;
