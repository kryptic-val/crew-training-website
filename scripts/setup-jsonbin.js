const axios = require('axios');
require('dotenv').config();

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';

console.log('🔧 JSONbin Setup Helper');
console.log('======================\n');

// Check if configuration is set up
if (JSONBIN_API_KEY === 'your-jsonbin-api-key' || JSONBIN_BIN_ID === 'your-jsonbin-bin-id') {
    console.error('❌ JSONbin configuration not found!');
    console.log('\n📝 Please create a .env file in your project root with:');
    console.log('JSONBIN_API_KEY=your-actual-api-key');
    console.log('JSONBIN_BIN_ID=your-actual-bin-id');
    console.log('\n💡 Get these from https://jsonbin.io/');
    console.log('\n📋 Steps to get your credentials:');
    console.log('1. Go to https://jsonbin.io/');
    console.log('2. Sign up or log in');
    console.log('3. Go to your account settings');
    console.log('4. Copy your "Master Key" (this is your API key)');
    console.log('5. Create a new bin or use an existing one');
    console.log('6. Copy the bin ID from the URL');
    process.exit(1);
}

console.log(`🔑 API Key: ${JSONBIN_API_KEY.substring(0, 8)}...`);
console.log(`📦 Bin ID: ${JSONBIN_BIN_ID}`);
console.log('');

async function testConnection() {
    try {
        console.log('🔍 Testing connection to JSONbin...');
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        
        console.log('✅ Connection successful!');
        console.log('📊 Current data structure:');
        console.log(JSON.stringify(response.data.record, null, 2));
        return true;
        
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('⚠️  Bin not found (404 error)');
            console.log('💡 The bin ID might be incorrect or the bin doesn\'t exist');
            return false;
        } else if (error.response && error.response.status === 401) {
            console.log('❌ Invalid API key (401 error)');
            console.log('💡 Please check your JSONBIN_API_KEY');
            return false;
        } else {
            console.log(`❌ Connection failed: ${error.message}`);
            return false;
        }
    }
}

async function createInitialStructure() {
    try {
        console.log('\n📦 Creating initial data structure...');
        
        const initialData = {
            users: [],
            categories: [],
            posts: [],
            comments: []
        };
        
        const response = await axios.put(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, initialData, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.status === 200) {
            console.log('✅ Initial structure created successfully!');
            console.log('📊 Data structure:');
            console.log(JSON.stringify(initialData, null, 2));
            return true;
        } else {
            console.log('❌ Failed to create structure');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error creating structure:', error.message);
        if (error.response) {
            console.error(`📊 Status: ${error.response.status}`);
            console.error(`📝 Response: ${JSON.stringify(error.response.data, null, 2)}`);
        }
        return false;
    }
}

async function main() {
    console.log('🚀 Starting JSONbin setup...\n');
    
    // Test connection first
    const connectionOk = await testConnection();
    
    if (!connectionOk) {
        console.log('\n🔧 Would you like to try creating the initial structure anyway?');
        console.log('   (This might work if the bin exists but is empty)');
        
        const created = await createInitialStructure();
        if (created) {
            console.log('\n✅ Setup completed! You can now run: npm run init-forum');
        } else {
            console.log('\n❌ Setup failed. Please check your credentials and try again.');
        }
    } else {
        console.log('\n✅ JSONbin is already set up and working!');
        console.log('🎉 You can now run: npm run init-forum');
    }
}

// Run the setup
if (require.main === module) {
    main();
}

module.exports = { testConnection, createInitialStructure }; 