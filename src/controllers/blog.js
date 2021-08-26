import { validationResult } from "express-validator";

export const createBlogPost = (req,res,next) => {
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('input invalid error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err; 
        // console.log('err :', errors)
        // res.status(400).json({
        //     message: "Request Error",
        //     data:null,
        // })
    }
    const result = {
        message: "Create Blog Post Success",
        data: {
            post_id:1,
            title: 'title blog',
            image: 'imagefile.png',
            body: 'loreml lorem lorem',
            created_at: "12/06/21",
            author: {
                uid: 1,
                name: "testing"
            }
        }
    }
    res.status(201).json(result)
}