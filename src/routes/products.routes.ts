import { Router } from "express";

import { ProductsController } from "@/controllers/products-controller";
import { ensureAuthentication } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get("/", ensureAuthentication, productsController.index);
productsRoutes.post(
  "/",
  ensureAuthentication,
  verifyUserAuthorization(["sale", "admin"]),
  productsController.create,
);

export { productsRoutes };
