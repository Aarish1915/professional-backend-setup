import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createComment, listComments } from '../controllers/comment.controller.js';

const router = Router();

router.post('/', protect, createComment);
router.get('/video/:videoId', listComments);

export default router;
