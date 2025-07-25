require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const { passport } = require('./config/auth');
const { userToLocals } = require('./config/middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Make user data available to all views
app.use(userToLocals);

// Handle invalid sessions
app.use((req, res, next) => {
    if (req.session && req.session.passport && !req.user) {
        console.log('Clearing invalid session');
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
        });
    }
    next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum');

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Crew Training Website' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About - Crew Training Website' });
});

app.get('/training', (req, res) => {
    res.render('training', { title: 'Training - Crew Training Website' });
});

// Authentication routes
app.use('/auth', authRoutes);

// Forum routes
app.use('/forum', forumRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 