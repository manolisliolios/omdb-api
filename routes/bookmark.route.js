import { Router } from 'express';
import BookmarkController from "../controllers/bookmark.controller"
import AuthHelper from "../helpers/auth.helper"

const router = Router();

router.get('/', AuthHelper.verifyToken, BookmarkController.getUserBookmarks);
router.post('/',AuthHelper.verifyToken, BookmarkController.addBookmark);
router.delete('/:bookmarkId',AuthHelper.verifyToken, BookmarkController.removeBookmark);

module.exports = router;