const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { isAuthenticated } = require('../config/middleware');

const router = express.Router();

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Helper function to get forum data from JSONbin
async function getForumData() {
    try {
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        const data = response.data.record;
        return {
            users: data.users || [],
            categories: data.categories || [],
            posts: data.posts || [],
            comments: data.comments || []
        };
    } catch (error) {
        console.error('Error fetching forum data from JSONbin:', error.message);
        return { users: [], categories: [], posts: [], comments: [] };
    }
}

// Helper function to save forum data to JSONbin
async function saveForumData(updatedData) {
    try {
        // Get the current complete data structure directly from JSONbin
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        const currentData = response.data.record;
        
        // Merge the updated data with existing data, preserving all arrays
        const mergedData = {
            users: currentData.users || [],
            categories: updatedData.categories || currentData.categories || [],
            posts: updatedData.posts || currentData.posts || [],
            comments: updatedData.comments || currentData.comments || []
        };
        
        console.log('Saving forum data:', {
            users: mergedData.users.length,
            categories: mergedData.categories.length,
            posts: mergedData.posts.length,
            comments: mergedData.comments.length
        });
        
        await axios.put(JSONBIN_URL, mergedData, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        return true;
    } catch (error) {
        console.error('Error saving forum data to JSONbin:', error.message);
        return false;
    }
}

// Forum home page - show categories
router.get('/', async (req, res) => {
    try {
        const { categories } = await getForumData();
        res.render('forum/index', {
            title: 'Forum - Crew Training Website',
            categories,
            user: req.user
        });
    } catch (error) {
        console.error('Forum home error:', error);
        res.render('forum/index', {
            title: 'Forum - Crew Training Website',
            categories: [],
            user: req.user,
            error: 'Failed to load forum categories'
        });
    }
});

// Show posts in a category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categories, posts } = await getForumData();
        
        const category = categories.find(c => c.id === categoryId);
        const categoryPosts = posts.filter(p => p.categoryId === categoryId);
        
        if (!category) {
            return res.redirect('/forum');
        }
        
        res.render('forum/category', {
            title: `${category.name} - Forum`,
            category,
            posts: categoryPosts,
            user: req.user
        });
    } catch (error) {
        console.error('Category view error:', error);
        res.redirect('/forum');
    }
});

// Show a single post with comments
router.get('/post/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { posts, comments, categories } = await getForumData();
        
        const post = posts.find(p => p.id === postId);
        if (!post) {
            return res.redirect('/forum');
        }
        
        const category = categories.find(c => c.id === post.categoryId);
        if (!category) {
            console.error(`Category not found for post ${postId}: ${post.categoryId}`);
            req.flash('error', 'Category information not found for this post');
            return res.redirect('/forum');
        }
        
        const postComments = comments.filter(c => c.postId === postId);
        
        res.render('forum/post', {
            title: `${post.title} - Forum`,
            post,
            category,
            comments: postComments,
            user: req.user
        });
    } catch (error) {
        console.error('Post view error:', error);
        res.redirect('/forum');
    }
});

// Create new post form
router.get('/new-post', isAuthenticated, async (req, res) => {
    try {
        const { categories } = await getForumData();
        res.render('forum/new-post', {
            title: 'Create New Post - Forum',
            categories,
            user: req.user
        });
    } catch (error) {
        console.error('New post form error:', error);
        res.redirect('/forum');
    }
});

// Handle new post creation
router.post('/new-post', isAuthenticated, async (req, res) => {
    try {
        const { title, content, categoryId } = req.body;
        
        if (!title || !content || !categoryId) {
            req.flash('error', 'All fields are required');
            return res.redirect('/forum/new-post');
        }
        
        const { posts, categories } = await getForumData();
        
        const newPost = {
            id: uuidv4(),
            title: title.trim(),
            content: content.trim(),
            categoryId,
            authorId: req.user.id,
            authorName: req.user.name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            views: 0,
            likes: 0,
            replies: 0
        };
        
        posts.push(newPost);
        
        const saved = await saveForumData({ categories, posts });
        
        if (saved) {
            req.flash('success', 'Post created successfully!');
            res.redirect(`/forum/post/${newPost.id}`);
        } else {
            req.flash('error', 'Failed to create post. Please try again.');
            res.redirect('/forum/new-post');
        }
        
    } catch (error) {
        console.error('Create post error:', error);
        req.flash('error', 'Failed to create post. Please try again.');
        res.redirect('/forum/new-post');
    }
});

// Handle new comment creation
router.post('/post/:postId/comment', isAuthenticated, async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        
        if (!content || content.trim().length === 0) {
            req.flash('error', 'Comment content is required');
            return res.redirect(`/forum/post/${postId}`);
        }
        
        const { posts, comments } = await getForumData();
        
        const newComment = {
            id: uuidv4(),
            postId,
            content: content.trim(),
            authorId: req.user.id,
            authorName: req.user.name,
            createdAt: new Date().toISOString(),
            likes: 0
        };
        
        comments.push(newComment);
        
        // Update post reply count
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.replies = comments.filter(c => c.postId === postId).length;
            post.updatedAt = new Date().toISOString();
        }
        
        const saved = await saveForumData({ posts, comments });
        
        if (saved) {
            req.flash('success', 'Comment added successfully!');
        } else {
            req.flash('error', 'Failed to add comment. Please try again.');
        }
        
        res.redirect(`/forum/post/${postId}`);
        
    } catch (error) {
        console.error('Create comment error:', error);
        req.flash('error', 'Failed to add comment. Please try again.');
        res.redirect(`/forum/post/${req.params.postId}`);
    }
});

// Like a post
router.post('/post/:postId/like', isAuthenticated, async (req, res) => {
    try {
        const { postId } = req.params;
        const { posts } = await getForumData();
        
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes += 1;
            await saveForumData({ posts });
        }
        
        res.json({ success: true, likes: post.likes });
    } catch (error) {
        console.error('Like post error:', error);
        res.json({ success: false });
    }
});

// Search posts
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        const { posts, categories } = await getForumData();
        
        if (!q || q.trim().length === 0) {
            return res.redirect('/forum');
        }
        
        const searchTerm = q.toLowerCase().trim();
        const searchResults = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm)
        );
        
        res.render('forum/search', {
            title: `Search Results for "${q}" - Forum`,
            searchTerm: q,
            results: searchResults,
            categories,
            user: req.user
        });
    } catch (error) {
        console.error('Search error:', error);
        res.redirect('/forum');
    }
});

module.exports = router; 