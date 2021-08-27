import express from 'express';
import { createBlogPost, getAllBlogPost, getBlogPostId } from '../controllers/blog.js';
import { body } from 'express-validator';
  
const router = express.Router();

// [POST] : /v1/blog/post 
router.post('/post',[
    body('title').isLength({min:5}).withMessage('input title tidak sesuai'),
    body('body').isLength({min:5}).withMessage('input body tidak sesuai')]
    ,createBlogPost)

    router.get('/posts',getAllBlogPost);
    router.get('/post/:postId', getBlogPostId)
export default router;