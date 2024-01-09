import { Router } from "express";
import usersrouter from "./users.mjs";
import productsrouter from "./products.mjs";

const router = Router();

router.use(usersrouter);
router.use(productsrouter);

export default router;
