import {Router} from "express";
import {getAlbumById, getAllAlbums, getAllUserAlbums} from "../controller/album.controller.js"

const router = Router();

router.get('/', getAllUserAlbums)
router.get('/all', getAllAlbums)
router.get('/:albumId', getAlbumById)

export default router