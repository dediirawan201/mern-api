import express from 'express';
import { createBlogPost } from '../controllers/blog.js';

const router = express.Router();

// [POST] : /v1/blog/post 
router.post('/post',createBlogPost)

export default router;