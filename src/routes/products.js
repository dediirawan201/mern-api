import express from "express";
import {createProduct,getAllProducts} from '../controllers/products.js'
const router = express.Router();

// CREATE->POST 
router.post('/product',createProduct)
//READ->GET
router.get('/products', getAllProducts)
// router.put('/products', (req,res,next) => {
//     res.json({name:"dedi irawan", email:"dedi@gmail.com" });
//     next()
// })
// router.delete('/products', (req,res,next) => {
//     res.json({name:"dedi irawan", email:"dedi@gmail.com"});
//     next()
// })

export default router;