const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

async function restoreCategories() {
    try {
        console.log('🔧 Restoring forum categories...\n');
        
        // Get current data
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        
        const currentData = response.data.record;
        const posts = currentData.posts || [];
        
        // Extract unique category IDs from posts
        const categoryIds = [...new Set(posts.map(post => post.categoryId))];
        console.log(`📊 Found ${categoryIds.length} category IDs referenced in posts:`, categoryIds);
        
        // Create the missing categories based on the IDs found in posts
        const categories = [
            {
                id: '20e17995-661d-4dda-bd52-467a80e8ae61',
                name: 'General Discussion',
                description: 'General topics and announcements about crew training',
                color: '#007bff',
                createdAt: '2025-07-20T21:21:28.119Z'
            },
            {
                id: 'b5aef0d7-93f3-47fa-a7c0-faa91212ab8b',
                name: 'Safety & Emergency Training',
                description: 'Safety procedures, emergency response, and crisis management training',
                color: '#dc3545',
                createdAt: '2025-07-20T21:21:28.119Z'
            },
            {
                id: 'df161d54-d051-4ba7-9ce1-209856c94fd3',
                name: 'Equipment & Technology',
                description: 'Training on new equipment, technology, and tools',
                color: '#28a745',
                createdAt: '2025-07-20T21:21:28.119Z'
            }
        ];
        
        console.log('\n📂 Restored categories:');
        categories.forEach(category => {
            console.log(`   - ${category.name} (${category.id})`);
        });
        
        // Update the data structure
        const updatedData = {
            users: currentData.users || [],
            categories: categories,
            posts: currentData.posts || [],
            comments: currentData.comments || []
        };
        
        // Save to JSONbin
        const saveResponse = await axios.put(JSONBIN_URL, updatedData, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (saveResponse.status === 200) {
            console.log('\n✅ Categories restored successfully!');
            console.log('🎉 Forum should now work properly with all categories visible.');
        } else {
            console.log('❌ Failed to restore categories');
        }
        
    } catch (error) {
        console.error('❌ Error restoring categories:', error.message);
    }
}

// Run the restoration
if (require.main === module) {
    restoreCategories();
}

module.exports = { restoreCategories }; 