const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const CREDS_PATH = path.join(__dirname, 'admin_creds.txt');

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
    ],
    username: { type: String, default: 'Guest' }
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
    const { content, channel, username } = req.body;
    const post = new Post({ content, channel: channel || 'Introductions', username: username || 'Guest' });
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

function readUsers() {
  if (!fs.existsSync(CREDS_PATH)) return [];
  try {
    const data = fs.readFileSync(CREDS_PATH, 'utf8');
    const json = JSON.parse(data);
    return json.users || [];
  } catch (e) {
    return [];
  }
}
function writeUsers(users) {
  fs.writeFileSync(CREDS_PATH, JSON.stringify({ users }, null, 2), 'utf8');
}

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash, isAdmin: false });
  writeUsers(users);
  res.json({ success: true });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ success: true, username });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
