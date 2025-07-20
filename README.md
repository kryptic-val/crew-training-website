# Crew Training Website

A modern web application built with Node.js, Express, and EJS for managing crew training programs in maritime and aviation industries.

## Features

- **Responsive Design**: Modern, mobile-friendly interface using Bootstrap 5
- **EJS Templates**: Server-side rendering with embedded JavaScript templates
- **Interactive UI**: Smooth animations and hover effects
- **Multiple Pages**: Home, About, and Training pages
- **Professional Styling**: Custom CSS with gradient backgrounds and modern design

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

### Option 1: Clone from GitHub (Recommended)
```bash
git clone https://github.com/YOUR_USERNAME/crew-training-website.git
cd crew-training-website
npm install
```

### Option 2: Download and Setup
1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd "Crew Training Website 2"
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Crew Training Website 2/
├── app.js                 # Main Express application
├── package.json           # Project dependencies and scripts
├── README.md             # This file
├── views/                # EJS template files
│   ├── partials/         # Reusable template components
│   │   ├── header.ejs    # Navigation and header
│   │   └── footer.ejs    # Footer and scripts
│   ├── index.ejs         # Home page
│   ├── about.ejs         # About page
│   └── training.ejs      # Training programs page
└── public/               # Static assets
    ├── css/
    │   └── style.css     # Custom styles
    └── js/
        └── main.js       # Client-side JavaScript
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript), Bootstrap 5
- **Styling**: Custom CSS with modern design patterns
- **JavaScript**: Vanilla JS with interactive features
- **Development**: Nodemon for auto-restart during development

## Features Overview

### Home Page
- Hero section with call-to-action
- Feature cards highlighting training areas
- Responsive design for all devices

### About Page
- Company mission and vision
- Key benefits and features
- Professional presentation

### Training Page
- Comprehensive course listings
- Course details and durations
- Interactive course cards

### Interactive Elements
- Smooth hover animations
- Button ripple effects
- Scroll-to-top functionality
- Form validation (ready for future forms)
- Active navigation highlighting

## Customization

### Adding New Pages
1. Create a new EJS file in the `views/` directory
2. Add a route in `app.js`
3. Include the header and footer partials

### Styling
- Modify `public/css/style.css` for custom styles
- Bootstrap classes are available for quick styling
- Gradient backgrounds and animations can be customized

### JavaScript Functionality
- Add new features in `public/js/main.js`
- Form validation is already set up
- Interactive elements can be extended

## Deployment

This application can be deployed to various platforms:

- **Heroku**: Add a `Procfile` with `web: node app.js`
- **Vercel**: Configure for Node.js deployment
- **Railway**: Direct deployment from GitHub
- **DigitalOcean**: Deploy to App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Version Control

This project uses Git for version control. See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed instructions on setting up Git and GitHub.

### Quick Git Commands:
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push
```

## Support

For questions or support, please open an issue in the repository or contact the development team. 