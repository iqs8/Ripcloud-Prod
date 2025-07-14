import {Router} from "express";
import { getAllSongs, getAllUserSongs, getDefaultSongs, getMostListenedToSongs, getSharedWithMeSongs} from "../controller/song.controller.js";
import {protectRoute, requireAdmin} from "../middleware/auth.middleware.js"

const router = Router();

router.get('/', protectRoute, getAllUserSongs);
router.get('/all', protectRoute, requireAdmin, getAllSongs);
router.get('/default', getDefaultSongs);
router.get('/most-listened-to', getMostListenedToSongs);
router.get('/shared', getSharedWithMeSongs);

export default router