// Configuration file for Crew Training Website
// Copy this file to .env and fill in your actual values

module.exports = {
    // JSONbin Configuration
    jsonbin: {
        apiKey: process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key-here',
        binId: process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id-here'
    },
    
    // Session Configuration
    session: {
        secret: process.env.SESSION_SECRET || 'your-super-secret-session-key-here'
    },
    
    // Environment
    env: process.env.NODE_ENV || 'development',
    
    // Server Configuration
    server: {
        port: process.env.PORT || 3000
    }
};