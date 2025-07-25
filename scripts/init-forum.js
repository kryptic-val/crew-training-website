const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';

// Check if configuration is set up
if (JSONBIN_API_KEY === 'your-jsonbin-api-key' || JSONBIN_BIN_ID === 'your-jsonbin-bin-id') {
    console.error('❌ JSONbin configuration not found!');
    console.log('\n📝 Please set up your .env file with:');
    console.log('JSONBIN_API_KEY=your-actual-api-key');
    console.log('JSONBIN_BIN_ID=your-actual-bin-id');
    console.log('\n💡 Get these from https://jsonbin.io/');
    process.exit(1);
}

const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Default forum categories
const defaultCategories = [
    {
        id: uuidv4(),
        name: 'General Discussion',
        description: 'General topics about crew training and maritime operations',
        postCount: 0,
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: 'Safety & Procedures',
        description: 'Safety protocols, emergency procedures, and best practices',
        postCount: 0,
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: 'Technical Training',
        description: 'Equipment operation, maintenance, and technical skills',
        postCount: 0,
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: 'Leadership & Management',
        description: 'Team leadership, communication, and management skills',
        postCount: 0,
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: 'Industry News',
        description: 'Latest news and updates from the maritime and aviation industries',
        postCount: 0,
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: 'Questions & Support',
        description: 'Ask questions and get help from the community',
        postCount: 0,
        createdAt: new Date().toISOString()
    }
];

// Sample posts
const samplePosts = [
    {
        id: uuidv4(),
        title: 'Welcome to the Crew Training Forum!',
        content: `Welcome everyone to our new community forum! This is a place where crew members, trainers, and industry professionals can share knowledge, ask questions, and connect with each other.

Feel free to:
- Share your experiences and insights
- Ask questions about training procedures
- Discuss best practices
- Connect with other professionals in the field

Let's make this a valuable resource for everyone in the crew training community!`,
        categoryId: defaultCategories[0].id, // General Discussion
        authorId: 'system',
        authorName: 'Forum Admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        replies: 0
    },
    {
        id: uuidv4(),
        title: 'Emergency Response Training Tips',
        content: `I wanted to share some valuable tips I've learned from emergency response training:

1. **Stay Calm**: The most important thing is to remain calm and think clearly
2. **Follow Procedures**: Always follow established emergency procedures
3. **Communication**: Clear communication is crucial during emergencies
4. **Practice Regularly**: Regular drills help build muscle memory
5. **Team Coordination**: Work together as a team

What are your experiences with emergency response training? Any additional tips to share?`,
        categoryId: defaultCategories[1].id, // Safety & Procedures
        authorId: 'system',
        authorName: 'Safety Officer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        replies: 0
    },
    {
        id: uuidv4(),
        title: 'New Equipment Training Resources',
        content: `I recently came across some excellent resources for training on new equipment:

**Online Courses:**
- Maritime Safety Training Portal
- Aviation Equipment Certification
- Virtual Reality Training Simulators

**Hands-on Training:**
- Equipment manufacturers often provide training
- Industry conferences and workshops
- Peer-to-peer learning sessions

Has anyone used any of these resources? What was your experience?`,
        categoryId: defaultCategories[2].id, // Technical Training
        authorId: 'system',
        authorName: 'Training Coordinator',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        replies: 0
    }
];

// Sample comments
const sampleComments = [
    {
        id: uuidv4(),
        postId: samplePosts[0].id,
        content: 'Great initiative! Looking forward to learning from everyone here.',
        authorId: 'system',
        authorName: 'Crew Member',
        createdAt: new Date().toISOString(),
        likes: 0
    },
    {
        id: uuidv4(),
        postId: samplePosts[1].id,
        content: 'Excellent points! I would also add that regular scenario-based training helps prepare for real emergencies.',
        authorId: 'system',
        authorName: 'Safety Trainer',
        createdAt: new Date().toISOString(),
        likes: 0
    }
];

async function testJSONbinConnection() {
    try {
        console.log('🔍 Testing JSONbin connection...');
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        console.log('✅ JSONbin connection successful!');
        return response.data.record;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('⚠️  Bin not found. Creating new bin...');
            return null;
        } else if (error.response && error.response.status === 401) {
            console.error('❌ Invalid API key. Please check your JSONBIN_API_KEY.');
            return null;
        } else {
            console.error('❌ JSONbin connection failed:', error.message);
            return null;
        }
    }
}

async function createNewBin() {
    try {
        console.log('📦 Creating new JSONbin...');
        const initialData = {
            users: [],
            categories: [],
            posts: [],
            comments: []
        };
        
        const response = await axios.post('https://api.jsonbin.io/v3/b', initialData, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ New bin created successfully!');
        console.log(`📋 Bin ID: ${response.data.metadata.id}`);
        console.log('💡 Update your .env file with this new bin ID');
        
        return response.data.metadata.id;
    } catch (error) {
        console.error('❌ Failed to create new bin:', error.message);
        return null;
    }
}

async function initializeForum() {
    try {
        console.log('🚀 Initializing forum with default data...');
        console.log(`🔑 Using API Key: ${JSONBIN_API_KEY.substring(0, 8)}...`);
        console.log(`📦 Using Bin ID: ${JSONBIN_BIN_ID}`);
        
        // Test connection first
        let currentData = await testJSONbinConnection();
        
        if (currentData === null) {
            console.log('\n💡 Would you like to create a new bin? (This will require updating your .env file)');
            console.log('   For now, let\'s try to initialize with the current bin ID...');
        }
        
        // Initialize forum data - preserve existing users
        const forumData = {
            users: currentData?.users || [],
            categories: currentData?.categories?.length > 0 ? currentData.categories : defaultCategories,
            posts: currentData?.posts?.length > 0 ? currentData.posts : samplePosts,
            comments: currentData?.comments?.length > 0 ? currentData.comments : sampleComments
        };
        
        // Update post counts
        defaultCategories.forEach(category => {
            category.postCount = samplePosts.filter(post => post.categoryId === category.id).length;
        });
        
        // Update reply counts
        samplePosts.forEach(post => {
            post.replies = sampleComments.filter(comment => comment.postId === post.id).length;
        });
        
        console.log('💾 Saving forum data to JSONbin...');
        
        // Save to JSONbin
        const saveResponse = await axios.put(JSONBIN_URL, forumData, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (saveResponse.status === 200) {
            console.log('✅ Forum initialized successfully!');
            console.log(`📊 Created ${defaultCategories.length} categories`);
            console.log(`📝 Created ${samplePosts.length} sample posts`);
            console.log(`💬 Created ${sampleComments.length} sample comments`);
            console.log('\n🎉 Your forum is ready to use!');
            console.log('🌐 Visit http://localhost:3000/forum to see your forum');
        } else {
            console.error('❌ Failed to save forum data');
        }
        
    } catch (error) {
        console.error('❌ Error initializing forum:', error.message);
        
        if (error.response) {
            console.error(`📊 Status: ${error.response.status}`);
            console.error(`📝 Response: ${JSON.stringify(error.response.data, null, 2)}`);
        }
        
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Check your .env file has correct JSONBIN_API_KEY and JSONBIN_BIN_ID');
        console.log('2. Verify your API key is valid at https://jsonbin.io/');
        console.log('3. Make sure your bin exists and is accessible');
        console.log('4. Check if you\'ve exceeded JSONbin free tier limits');
    }
}

// Run the initialization
if (require.main === module) {
    initializeForum();
}

module.exports = { initializeForum }; 