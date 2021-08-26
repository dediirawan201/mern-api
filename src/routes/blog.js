import express from 'express';
import { createBlogPost } from '../controllers/blog.js';
import { body } from 'express-validator';

const router = express.Router();

// [POST] : /v1/blog/post 
router.post('/post',[
    body('title').isLength({min:5}).withMessage('input title tidak sesuai'),
    body('body').isLength({min:5}).withMessage('input body tidak sesuai')]
    ,createBlogPost)

export default router;