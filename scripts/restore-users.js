const axios = require('axios');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

async function restoreUsers() {
    try {
        console.log('🔧 Restoring user data...\n');
        
        // Get current data
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        
        const currentData = response.data.record;
        
        // Create the user that was referenced in comments
        const vincentUser = {
            id: 'faa77b50-91d2-4958-8c56-79a62e45c42d',
            name: 'Vincent Liu',
            email: 'vincentniuliu@gmail.com',
            password: '$2b$10$IRNUxd0DisvgvkG.YwOnx.S5D59Eg6NIROaTpZ2c0pXM6je5zsjBq',
            role: 'user',
            createdAt: '2025-07-20T20:14:16.859Z'
        };
        
        // Add any other users that might have existed
        const restoredUsers = [vincentUser];
        
        // Update the data structure
        const updatedData = {
            users: restoredUsers,
            categories: currentData.categories || [],
            posts: currentData.posts || [],
            comments: currentData.comments || []
        };
        
        console.log('👥 Restored users:');
        restoredUsers.forEach(user => {
            console.log(`   - ${user.name} (${user.email})`);
        });
        
        // Save to JSONbin
        const saveResponse = await axios.put(JSONBIN_URL, updatedData, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (saveResponse.status === 200) {
            console.log('\n✅ User data restored successfully!');
            console.log('🔑 You can now login with:');
            console.log('   Email: vincentniuliu@gmail.com');
            console.log('   Password: (your original password)');
        } else {
            console.log('❌ Failed to restore user data');
        }
        
    } catch (error) {
        console.error('❌ Error restoring users:', error.message);
    }
}

// Run the restoration
if (require.main === module) {
    restoreUsers();
}

module.exports = { restoreUsers }; 