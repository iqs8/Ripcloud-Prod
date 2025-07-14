import {Router} from "express";
import {protectRoute, requireAdmin} from "../middleware/auth.middleware.js"
import { getStats, getUserStats } from "../controller/stat.controller.js";

const router = Router();

router.get('/', protectRoute, requireAdmin, getStats);
router.get('/user', protectRoute, getUserStats);

export default router