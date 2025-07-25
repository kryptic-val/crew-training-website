const axios = require('axios');
require('dotenv').config();

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

async function checkUsers() {
    try {
        console.log('🔍 Checking user data consistency...\n');
        
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        
        const data = response.data.record;
        const users = data.users || [];
        
        console.log(`📊 Found ${users.length} users in database\n`);
        
        if (users.length === 0) {
            console.log('❌ No users found in database');
            return;
        }
        
        console.log('👥 User Details:');
        users.forEach((user, index) => {
            console.log(`\n${index + 1}. User ID: ${user.id}`);
            console.log(`   Name: ${user.name || 'N/A'}`);
            console.log(`   Email: ${user.email || 'N/A'}`);
            console.log(`   Role: ${user.role || 'N/A'}`);
            console.log(`   Created: ${user.createdAt || 'N/A'}`);
            
            // Check for required fields
            const issues = [];
            if (!user.id) issues.push('Missing ID');
            if (!user.email) issues.push('Missing email');
            if (!user.password) issues.push('Missing password');
            
            if (issues.length > 0) {
                console.log(`   ⚠️  Issues: ${issues.join(', ')}`);
            } else {
                console.log(`   ✅ Valid user data`);
            }
        });
        
        // Check for duplicate emails
        const emails = users.map(u => u.email).filter(Boolean);
        const uniqueEmails = [...new Set(emails)];
        
        if (emails.length !== uniqueEmails.length) {
            console.log('\n⚠️  Warning: Duplicate email addresses found!');
        }
        
        // Check for duplicate IDs
        const ids = users.map(u => u.id).filter(Boolean);
        const uniqueIds = [...new Set(ids)];
        
        if (ids.length !== uniqueIds.length) {
            console.log('\n⚠️  Warning: Duplicate user IDs found!');
        }
        
        console.log('\n✅ User data check completed');
        
    } catch (error) {
        console.error('❌ Error checking users:', error.message);
    }
}

// Run the check
if (require.main === module) {
    checkUsers();
}

module.exports = { checkUsers }; 