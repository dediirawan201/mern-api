import bodyParser from 'body-parser';
import express from 'express';
import productRoutes from './src/routes/products.js';
import authRoutes from './src/routes/auth.js';
import blogRoutes from './src/routes/blog.js';

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
app.listen(4000)
 