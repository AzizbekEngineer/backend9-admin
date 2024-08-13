import express from "express";
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js";
import ProductsController from "../controller/product.js";
import { auth } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { ownerMiddleware } from "../middleware/owner-middleware.js";
import { upload } from "../middleware/uploader.js";
const router = express.Router();

router.get("/api/blogs", [auth, adminMiddleware], BlogsController.get);
router.post("/api/blogs", [auth, ownerMiddleware], BlogsController.create);
router.delete(
  "/api/blogs/:id",
  [auth, ownerMiddleware],
  BlogsController.delete
);
router.patch("/api/blogs/:id", BlogsController.updateBlog);

router.get("/api/profile", [auth], UsersController.getProfile);
router.get("/api/users", UsersController.getAllUsers);
router.get("/api/users/search", UsersController.getUserSearch);
router.post("/api/users/sign-up", UsersController.registerUser);
router.post("/api/users/sign-in", UsersController.loginUser);
router.patch("/api/users/:id", UsersController.updateUser);
router.delete("/api/users/:id", UsersController.delete);

router.post(
  "/api/products",
  [auth, upload.array("rasm")],
  ProductsController.create
);
router.get("/api/products", [auth], ProductsController.get);
router.delete("/api/products/:id", [auth], ProductsController.delete);

export default router;
