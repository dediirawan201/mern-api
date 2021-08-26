import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BlogPost = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }, 
    author: {
        type: Object,
        required: true,
    }
}, { 
    timestamps: true
});

export default mongoose.model('BlogPost', BlogPost)