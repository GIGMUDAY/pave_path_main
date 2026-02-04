import { Router } from 'express';
import multer from 'multer';
import { createPost, deletePost, getPostImage, listPosts, updatePost } from '../controllers/postsController';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed'));
    }
    cb(null, true);
  },
});

const router = Router();

router.get('/', listPosts);
router.get('/:id/image', getPostImage);
router.post('/', upload.single('image'), createPost);
router.put('/:id', upload.single('image'), updatePost);
router.delete('/:id', deletePost);

export default router;
