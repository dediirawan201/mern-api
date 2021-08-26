import bodyParser from 'body-parser';
import express from 'express';
import productRoutes from './src/routes/products.js';
import authRoutes from './src/routes/auth.js';
import blogRoutes from './src/routes/blog.js';
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json()) //type JSON
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})
app.use('/v1/customer', productRoutes);
app.use('/v1/auth', authRoutes)
app.use('/v1/blog', blogRoutes)
app.use((error,req,res,next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data})
})

mongoose.connect('mongodb+srv://dedi:B15M1LL4h@cluster0.cii5r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    app.listen(4000, () => console.log('Connection Success'))
})
.catch(err => console.log(err));

 