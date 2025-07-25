const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// JSONbin configuration
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || 'your-jsonbin-api-key';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || 'your-jsonbin-bin-id';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

async function restoreForumData() {
    try {
        console.log('🔧 Restoring complete forum data...\n');
        
        // Get current data
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        
        const currentData = response.data.record;
        
        // Restore categories
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
        
        // Restore posts
        const posts = [
            {
                id: '4946f588-1a2e-4927-b79d-aa4b8df16422',
                title: 'Welcome to the Crew Training Forum!',
                content: 'Welcome everyone to our new community forum! This is a place where crew members, trainers, and industry professionals can share knowledge, ask questions, and connect with each other.\n\nFeel free to:\n- Share your experiences and insights\n- Ask questions about training procedures\n- Discuss best practices\n- Connect with other professionals in the field\n\nLet\'s make this a valuable resource for everyone in the crew training community!',
                categoryId: '20e17995-661d-4dda-bd52-467a80e8ae61',
                authorId: 'system',
                authorName: 'Forum Admin',
                createdAt: '2025-07-20T21:21:28.119Z',
                updatedAt: '2025-07-20T21:21:28.119Z',
                views: 0,
                likes: 0,
                replies: 1
            },
            {
                id: '2081694f-6b40-4b3a-8085-1e77b1bf282d',
                title: 'Emergency Response Training Tips',
                content: 'I wanted to share some valuable tips I\'ve learned from emergency response training:\n\n1. **Stay Calm**: The most important thing is to remain calm and think clearly\n2. **Follow Procedures**: Always follow established emergency procedures\n3. **Communication**: Clear communication is crucial during emergencies\n4. **Practice Regularly**: Regular drills help build muscle memory\n5. **Team Coordination**: Work together as a team\n\nWhat are your experiences with emergency response training? Any additional tips to share?',
                categoryId: 'b5aef0d7-93f3-47fa-a7c0-faa91212ab8b',
                authorId: 'system',
                authorName: 'Safety Officer',
                createdAt: '2025-07-20T21:21:28.119Z',
                updatedAt: '2025-07-20T21:21:28.119Z',
                views: 0,
                likes: 0,
                replies: 1
            },
            {
                id: '7d195d67-bd48-4268-b589-d22d2e5c3d30',
                title: 'New Equipment Training Resources',
                content: 'I recently came across some excellent resources for training on new equipment:\n\n**Online Courses:**\n- Maritime Safety Training Portal\n- Aviation Equipment Certification\n- Virtual Reality Training Simulators\n\n**Hands-on Training:**\n- Equipment manufacturers often provide training\n- Industry conferences and workshops\n- Peer-to-peer learning sessions\n\nHas anyone used any of these resources? What was your experience?',
                categoryId: 'df161d54-d051-4ba7-9ce1-209856c94fd3',
                authorId: 'system',
                authorName: 'Training Coordinator',
                createdAt: '2025-07-20T21:21:28.119Z',
                updatedAt: '2025-07-20T21:22:50.189Z',
                views: 0,
                likes: 0,
                replies: 1
            }
        ];
        
        // Restore comments
        const comments = [
            {
                id: '7949324e-794e-4240-bc93-eb2b0976d931',
                postId: '4946f588-1a2e-4927-b79d-aa4b8df16422',
                content: 'Great initiative! Looking forward to learning from everyone here.',
                authorId: 'system',
                authorName: 'Crew Member',
                createdAt: '2025-07-20T21:21:28.119Z',
                likes: 0
            },
            {
                id: 'b5cb70fe-6d02-47d5-928a-db73e95680bb',
                postId: '2081694f-6b40-4b3a-8085-1e77b1bf282d',
                content: 'Excellent points! I would also add that regular scenario-based training helps prepare for real emergencies.',
                authorId: 'system',
                authorName: 'Safety Trainer',
                createdAt: '2025-07-20T21:21:28.119Z',
                likes: 0
            },
            {
                id: 'd03a5358-4b35-40c6-918a-77c8612fd2e8',
                postId: '7d195d67-bd48-4268-b589-d22d2e5c3d30',
                content: 'Hi, this looks really cool!',
                authorId: 'faa77b50-91d2-4958-8c56-79a62e45c42d',
                authorName: 'Vincent Liu',
                createdAt: '2025-07-20T21:22:50.189Z',
                likes: 0
            }
        ];
        
        // Update the complete data structure
        const updatedData = {
            users: currentData.users || [],
            categories: categories,
            posts: posts,
            comments: comments
        };
        
        console.log('📊 Restored data:');
        console.log(`   Users: ${updatedData.users.length}`);
        console.log(`   Categories: ${updatedData.categories.length}`);
        console.log(`   Posts: ${updatedData.posts.length}`);
        console.log(`   Comments: ${updatedData.comments.length}`);
        
        // Save to JSONbin
        const saveResponse = await axios.put(JSONBIN_URL, updatedData, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (saveResponse.status === 200) {
            console.log('\n✅ Complete forum data restored successfully!');
            console.log('🎉 Forum should now work properly with all data intact.');
        } else {
            console.log('❌ Failed to restore forum data');
        }
        
    } catch (error) {
        console.error('❌ Error restoring forum data:', error.message);
    }
}

// Run the restoration
if (require.main === module) {
    restoreForumData();
}

module.exports = { restoreForumData }; 