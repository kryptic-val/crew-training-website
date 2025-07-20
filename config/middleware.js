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
    res.locals.user = req.user || null;
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    userToLocals
}; 