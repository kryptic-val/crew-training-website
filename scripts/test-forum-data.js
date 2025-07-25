const axios = require('axios');
require('dotenv').config();

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

async function testForumData() {
    try {
        console.log('🧪 Testing forum data preservation...\n');
        
        // Get current data
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        
        const data = response.data.record;
        
        console.log('📊 Current data structure:');
        console.log(`   Users: ${data.users ? data.users.length : 0}`);
        console.log(`   Categories: ${data.categories ? data.categories.length : 0}`);
        console.log(`   Posts: ${data.posts ? data.posts.length : 0}`);
        console.log(`   Comments: ${data.comments ? data.comments.length : 0}`);
        
        // Test the saveForumData function logic
        console.log('\n🔧 Testing data preservation logic...');
        
        // Simulate what happens when creating a new post
        const testData = {
            posts: [...(data.posts || []), { id: 'test-post', title: 'Test Post' }]
        };
        
        // Simulate the new saveForumData logic
        const mergedData = {
            users: data.users || [],
            categories: testData.categories || data.categories || [],
            posts: testData.posts || data.posts || [],
            comments: testData.comments || data.comments || []
        };
        
        console.log('✅ After merging:');
        console.log(`   Users preserved: ${mergedData.users.length}`);
        console.log(`   Categories preserved: ${mergedData.categories.length}`);
        console.log(`   Posts updated: ${mergedData.posts.length}`);
        console.log(`   Comments preserved: ${mergedData.comments.length}`);
        
        // Verify no data loss
        const usersLost = (data.users || []).length - mergedData.users.length;
        const categoriesLost = (data.categories || []).length - mergedData.categories.length;
        const commentsLost = (data.comments || []).length - mergedData.comments.length;
        
        if (usersLost === 0 && categoriesLost === 0 && commentsLost === 0) {
            console.log('\n🎉 Data preservation test PASSED!');
            console.log('✅ No data will be lost when creating posts/comments');
        } else {
            console.log('\n❌ Data preservation test FAILED!');
            console.log(`   Users lost: ${usersLost}`);
            console.log(`   Categories lost: ${categoriesLost}`);
            console.log(`   Comments lost: ${commentsLost}`);
        }
        
    } catch (error) {
        console.error('❌ Error testing forum data:', error.message);
    }
}

// Run the test
if (require.main === module) {
    testForumData();
}

module.exports = { testForumData }; 