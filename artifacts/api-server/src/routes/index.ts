import { Router, type IRouter } from "express";
import healthRouter from "./health";
import aiSearchRouter from "./aiSearch";

const router: IRouter = Router();

router.use(healthRouter);
router.use(aiSearchRouter);

export default router;
