const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const axios = require('axios');

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Helper function to get users from JSONbin
async function getUsers() {
    try {
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        return response.data.record.users || [];
    } catch (error) {
        console.error('Error fetching users from JSONbin:', error.message);
        return [];
    }
}

// Helper function to save users to JSONbin
async function saveUsers(users) {
    try {
        // Get current complete data structure
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        const currentData = response.data.record;
        
        // Merge users with existing data, preserving all other arrays
        const mergedData = {
            users: users,
            categories: currentData.categories || [],
            posts: currentData.posts || [],
            comments: currentData.comments || []
        };
        
        console.log('Saving user data:', {
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
        console.error('Error saving users to JSONbin:', error.message);
        return false;
    }
}

// Passport configuration
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const users = await getUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const users = await getUsers();
        const user = users.find(u => u.id === id);
        
        if (!user) {
            console.log(`User not found during deserialization: ${id}`);
            console.log('Available users:', users.map(u => ({ id: u.id, email: u.email })));
            return done(null, false);
        }
        
        done(null, user);
    } catch (error) {
        console.error('Error during user deserialization:', error);
        done(null, false);
    }
});

module.exports = {
    passport,
    getUsers,
    saveUsers
}; 