const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/discussion_forum');

// Post schema (add channel field)
const postSchema = new mongoose.Schema({
    channel: { type: String, default: 'Introductions' },
    content: String,
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            content: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
});
const Post = mongoose.model('Post', postSchema);

// Get all posts for a channel, or all posts if ?all=1
app.get('/api/posts', async (req, res) => {
    if (req.query.all === '1') {
        const posts = await Post.find();
        return res.json(posts);
    }
    const channel = req.query.channel || 'Introductions';
    const posts = await Post.find({ channel }).sort({ createdAt: -1 });
    res.json(posts);
});

// Create a new post for a channel
app.post('/api/posts', async (req, res) => {
    const { content, channel } = req.body;
    const post = new Post({ content, channel: channel || 'Introductions' });
    await post.save();
    res.json(post);
});

// Upvote a post
app.post('/api/posts/:id/upvote', async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.upvotes++;
    await post.save();
    res.json(post);
});

// Downvote a post
app.post('/api/posts/:id/downvote', async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.downvotes++;
    await post.save();
    res.json(post);
});

// Delete a post (no auth)
app.delete('/api/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
