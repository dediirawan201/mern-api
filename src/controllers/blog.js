import { validationResult } from "express-validator";
import BlogPost from '../models/blog.js';

export const createBlogPost = (req,res,next) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const err = new Error('input invalid error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err; 
    }
    
    if(!req.file){ 
        const err = new Error('gambar harus diupload!!!'); 
        err.errorStatus = 422;
        throw err; 
    }

    const title = req.body.title;
    const image = req.file.path; 
    const body = req.body.body;

    const Posting = new BlogPost({
        title,
        body,
        image, 
        author: {
            uid:1,
            name:'Dedi Irawan'
        }
    })

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Blog Post Success',
            data: result
        });
    })
    .catch(err => {
        console.log('err: ', err);
    });
    
 
}

export const getAllBlogPost = (req,res, next) => {
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

export const getBlogPostId = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result => {
        if(!result)  {
            const error = new Error('Blog Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({ 
            message: 'Data Blog post berhasil dipanggil',
            data: result, 
        })
    })
    .catch(err => {
        next(err)
    })
}