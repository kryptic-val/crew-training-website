// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Middleware to check if user is not authenticated (for login/register pages)
function isNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
}

// Middleware to make user data available to all views
function userToLocals(req, res, next) {
    // Check if user exists and is valid
    if (req.user && req.user.id) {
        res.locals.user = req.user;
        res.locals.isAuthenticated = true;
    } else {
        res.locals.user = null;
        res.locals.isAuthenticated = false;
        // Clear the session if user is invalid
        if (req.session && req.session.passport) {
            delete req.session.passport;
        }
    }
    next();
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    userToLocals
}; 