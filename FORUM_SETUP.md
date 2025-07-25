# Forum Setup Guide

This guide will help you set up and use the forum feature for your Crew Training Website.

## Features Included

### 🎯 Core Forum Features
- ✅ **Categories & Posts** - Organized discussion topics
- ✅ **Comments & Replies** - Interactive discussions
- ✅ **User Authentication** - Secure posting and commenting
- ✅ **Search Functionality** - Find posts and discussions
- ✅ **Like System** - Community engagement
- ✅ **Responsive Design** - Works on all devices

### 🔧 Technical Features
- ✅ **JSONbin Storage** - Cloud-based data storage
- ✅ **Real-time Updates** - Instant post creation and comments
- ✅ **User Management** - Author tracking and permissions
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Security** - Protected routes and input sanitization

## Prerequisites

1. **JSONbin Account** (already set up for authentication)
2. **Environment Variables** (already configured)
3. **User Registration** (forum requires login to post)

## Setup Instructions

### Step 1: Initialize Forum Data

Run the forum initialization script to create default categories and sample posts:

```bash
npm run init-forum
```

This will create:
- 6 default categories (General Discussion, Safety & Procedures, etc.)
- 3 sample posts with comments
- Proper data structure in JSONbin

### Step 2: Verify Setup

1. **Start your application:**
   ```bash
   npm run dev
   ```

2. **Visit the forum:**
   - Go to `http://localhost:3000/forum`
   - You should see the forum home page with categories

3. **Test functionality:**
   - Browse categories
   - View sample posts
   - Try the search feature
   - Login to create posts and comments

## Forum Structure

### Data Organization in JSONbin:
```json
{
  "users": [...],           // User accounts (from authentication)
  "categories": [...],      // Forum categories
  "posts": [...],          // Forum posts
  "comments": [...],       // Post comments
}
```

### Default Categories:
1. **General Discussion** - General topics about crew training
2. **Safety & Procedures** - Safety protocols and emergency procedures
3. **Technical Training** - Equipment operation and maintenance
4. **Leadership & Management** - Team leadership and communication
5. **Industry News** - Latest industry updates
6. **Questions & Support** - Community help and support

## Usage Guide

### For Users:

#### **Browsing the Forum:**
1. Visit `/forum` to see all categories
2. Click on a category to see posts
3. Click on a post to read and comment
4. Use the search bar to find specific topics

#### **Creating Posts:**
1. **Login** to your account
2. Click **"Create New Post"** button
3. **Select a category** for your post
4. **Write a clear title** and detailed content
5. **Submit** your post

#### **Commenting:**
1. **Login** to your account
2. **Navigate** to any post
3. **Scroll down** to the comments section
4. **Write your comment** and submit

#### **Searching:**
1. Use the **search bar** in the forum
2. **Enter keywords** to find relevant posts
3. **Browse results** and click on interesting posts

### For Administrators:

#### **Managing Content:**
- Posts and comments are automatically linked to user accounts
- Users can edit/delete their own content
- All activity is tracked with timestamps

#### **Monitoring:**
- View post counts and engagement metrics
- Monitor user activity through the dashboard
- Check for inappropriate content

## Forum URLs

| URL | Description |
|-----|-------------|
| `/forum` | Forum home page (categories) |
| `/forum/category/:id` | View posts in a category |
| `/forum/post/:id` | View a specific post with comments |
| `/forum/new-post` | Create a new post (login required) |
| `/forum/search?q=term` | Search posts |

## Customization

### Adding New Categories:
1. **Edit** `scripts/init-forum.js`
2. **Add** new category objects to `defaultCategories`
3. **Run** `npm run init-forum` to update

### Modifying Forum Features:
1. **Routes**: Edit `routes/forum.js`
2. **Views**: Modify files in `views/forum/`
3. **Styling**: Update `public/css/style.css`

### Forum Rules and Guidelines:
Edit the rules displayed in `views/forum/index.ejs`:
```html
<li class="mb-2">
    <i class="fas fa-check text-success me-2"></i>
    Your custom rule here
</li>
```

## Security Features

### User Authentication:
- ✅ **Login required** for posting and commenting
- ✅ **User verification** for all actions
- ✅ **Session management** for security

### Content Protection:
- ✅ **Input validation** on all forms
- ✅ **XSS protection** through proper escaping
- ✅ **CSRF protection** built into Express

### Data Security:
- ✅ **Secure API calls** to JSONbin
- ✅ **Environment variables** for sensitive data
- ✅ **Error handling** for failed operations

## Troubleshooting

### Common Issues:

1. **"No categories available"**
   - Run `npm run init-forum` to create default data
   - Check your JSONbin API key and bin ID

2. **"Failed to create post"**
   - Ensure you're logged in
   - Check your internet connection
   - Verify JSONbin API limits

3. **"Search not working"**
   - Check if posts exist in the database
   - Verify search query format
   - Check browser console for errors

4. **"Comments not appearing"**
   - Refresh the page
   - Check if you're logged in
   - Verify comment was submitted successfully

### JSONbin Limits:
- **Free tier**: 10,000 requests/month
- **Data size**: 100KB per bin
- **Rate limiting**: 1 request/second

## Performance Tips

### For Better Performance:
1. **Limit post content** to reasonable lengths
2. **Use appropriate categories** for organization
3. **Regular maintenance** of old posts
4. **Monitor API usage** to stay within limits

### Optimization:
- Posts are loaded efficiently with pagination
- Search is performed on titles and content
- Comments are loaded per post
- Images and media are not supported (text only)

## Future Enhancements

### Possible Additions:
- **File attachments** for posts
- **User profiles** and avatars
- **Post moderation** tools
- **Email notifications** for replies
- **Advanced search** filters
- **Post tagging** system
- **User reputation** system

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your JSONbin configuration
3. Check the browser console for errors
4. Ensure all dependencies are installed

Your forum is now ready to foster community discussion and knowledge sharing! 