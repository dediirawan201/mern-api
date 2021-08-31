import { validationResult } from "express-validator";
import BlogPost from '../models/blog.js';
import path, { parse } from 'path';
import fs from 'fs';

const __dirname = path.resolve();

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
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
    })
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil dipanggil',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
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

export const updateBlogPost = (req,res, next) => {
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
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Blog post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update sukses',
            data: result,
        })
    }) 
    .catch(err => {
        next(err);
    })

   
}

export const deleteBlogPost = (req,res,next) => {
    const postId = req.params.postId; 

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Blog Post tidak ditemukan')
            error.errorStatus = 404
            throw error
        }
        removeImage(post.image);
        return BlogPost.findByIdAndRemove(postId)
    })
        .then(result => {
            res.status(200).json({
                message: 'hapus blog post berhasil',
                data:result,

        })
    })
    .catch(err => {
        next(err)
    })
}

const removeImage = (filePath) => {
    console.log('filepath', filePath)
    console.log('__dir name', __dirname)

    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err))
}
