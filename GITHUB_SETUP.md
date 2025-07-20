# GitHub Setup Guide

This guide will help you set up Git and connect your Crew Training Website project to GitHub.

## Prerequisites

1. **Git Installation** (if not already installed)
2. **GitHub Account** (if not already created)

## Step 1: Install Git

### For Windows:
1. **Download Git for Windows** from: https://git-scm.com/download/win
2. **Run the installer** and follow the setup wizard
3. **Restart your terminal/PowerShell** after installation
4. **Verify installation** by running:
   ```bash
   git --version
   ```

### For macOS:
```bash
# Using Homebrew
brew install git

# Or download from https://git-scm.com/download/mac
```

### For Linux:
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

## Step 2: Configure Git

After installing Git, configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Create a GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the details**:
   - Repository name: `crew-training-website`
   - Description: `A modern web application for crew training management`
   - Make it **Public** or **Private** (your choice)
   - **Don't** initialize with README (we'll push our existing code)
5. **Click "Create repository"**

## Step 4: Initialize Git Repository (Local)

Open your terminal in your project directory and run:

```bash
# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Crew Training Website with authentication"

# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/crew-training-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Verify Setup

1. **Check your GitHub repository** - you should see all your files
2. **Verify .gitignore is working** - you shouldn't see:
   - `node_modules/` folder
   - `.env` file
   - Any log files

## Step 6: Future Development Workflow

### Making Changes:
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

### Pulling Updates (if working with others):
```bash
git pull origin main
```

## Important Notes

### .gitignore Protection
The `.gitignore` file I created will protect:
- ✅ `node_modules/` (dependencies)
- ✅ `.env` (environment variables with API keys)
- ✅ Log files
- ✅ OS-specific files
- ✅ Editor files

### Environment Variables
**NEVER commit your `.env` file** - it contains sensitive information like:
- JSONbin API keys
- Session secrets
- Database passwords

### Branching Strategy (Optional)
For larger projects, consider using branches:
```bash
# Create a new feature branch
git checkout -b feature/new-feature

# Work on your feature
# ... make changes ...

# Commit and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Merge back to main (on GitHub or locally)
git checkout main
git merge feature/new-feature
```

## Troubleshooting

### Common Issues:

1. **"git is not recognized"**
   - Git is not installed or not in PATH
   - Restart terminal after installation

2. **"Permission denied"**
   - Check your GitHub credentials
   - Use Personal Access Token if needed

3. **"Repository not found"**
   - Check the repository URL
   - Ensure you have access to the repository

4. **Large files not uploading**
   - Check if they're in `.gitignore`
   - Consider using Git LFS for large files

### GitHub Authentication:
If you're asked for credentials:
1. **Username**: Your GitHub username
2. **Password**: Use a Personal Access Token (not your GitHub password)
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with repo permissions

## Next Steps

After setting up GitHub:
1. **Set up GitHub Pages** (optional - for live demo)
2. **Add collaborators** (if working with a team)
3. **Set up GitHub Actions** (for CI/CD)
4. **Create issues and projects** (for project management)

## Security Best Practices

1. **Never commit sensitive data** (API keys, passwords)
2. **Use environment variables** for configuration
3. **Regularly update dependencies**
4. **Review code before merging**
5. **Use meaningful commit messages**

Your project is now ready for collaborative development and version control! 