const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { passport, getUsers, saveUsers } = require('../config/auth');
const { isAuthenticated, isNotAuthenticated } = require('../config/middleware');

const router = express.Router();

// Login page
router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('auth/login', { 
        title: 'Login - Crew Training Website',
        error: req.flash('error'),
        success: req.flash('success')
    });
});

// Login POST
router.post('/login', isNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

// Register page
router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('auth/register', { 
        title: 'Register - Crew Training Website',
        error: req.flash('error'),
        success: req.flash('success')
    });
});

// Register POST
router.post('/register', isNotAuthenticated, async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            req.flash('error', 'All fields are required');
            return res.redirect('/auth/register');
        }

        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/auth/register');
        }

        if (password.length < 6) {
            req.flash('error', 'Password must be at least 6 characters long');
            return res.redirect('/auth/register');
        }

        // Check if user already exists
        const users = await getUsers();
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            req.flash('error', 'Email already registered');
            return res.redirect('/auth/register');
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        // Save user to JSONbin
        users.push(newUser);
        const saved = await saveUsers(users);

        if (saved) {
            req.flash('success', 'Registration successful! Please log in.');
            res.redirect('/auth/login');
        } else {
            req.flash('error', 'Registration failed. Please try again.');
            res.redirect('/auth/register');
        }

    } catch (error) {
        console.error('Registration error:', error);
        req.flash('error', 'Registration failed. Please try again.');
        res.redirect('/auth/register');
    }
});

// Dashboard (protected route)
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('auth/dashboard', { 
        title: 'Dashboard - Crew Training Website',
        user: req.user
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        req.flash('success', 'You have been logged out successfully');
        res.redirect('/');
    });
});

module.exports = router; 