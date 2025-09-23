# Recipe Finder Application

A full-stack web application that helps users search for recipes, save favorites, and manage cooking timers. This project demonstrates modern web development practices including API integration, responsive design, and full-stack architecture.

## Table of Contents

- [Overview](#overview)
- [Learning Objectives](#learning-objectives)  
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Key Learning Concepts](#key-learning-concepts)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

## Overview

This Recipe Finder application is designed as an educational project to help students learn full-stack web development. It combines a Node.js/Express backend with a vanilla JavaScript frontend to create a comprehensive recipe search and management system.

The application fetches data from the external Spoonacular API, processes it on the backend, and presents it through an interactive web interface with modern UI/UX design principles.

## Learning Objectives

Students will learn:

- **API Integration**: How to consume external REST APIs and handle API responses
- **Backend Development**: Building REST APIs with Node.js and Express
- **Frontend Development**: Creating interactive UIs with vanilla JavaScript
- **Full-Stack Architecture**: Connecting frontend and backend components
- **Error Handling**: Implementing proper error handling across the application stack
- **Responsive Design**: Creating mobile-friendly interfaces
- **Data Persistence**: Using localStorage for client-side data storage
- **Async Programming**: Handling asynchronous operations in JavaScript
- **DOM Manipulation**: Dynamically updating web page content
- **State Management**: Managing application state without frameworks

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for building APIs
- **Axios**: HTTP client for making API requests
- **CORS**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

### Frontend
- **Vanilla JavaScript**: Core application logic using modern ES6+ features
- **HTML5**: Semantic markup structure
- **CSS3**: Styling with modern features (Grid, Flexbox, Animations)
- **Fetch API**: For making HTTP requests to backend
- **LocalStorage**: Browser storage for favorites persistence

### External APIs
- **Spoonacular API**: Comprehensive recipe and food database API

## Project Structure

```
recipe-finder-js/
├── README.md
├── package.json                 # Root package file with scripts
├── .gitignore                   # Git ignore patterns
├── backend/                     # Server-side application
│   ├── package.json            # Backend dependencies
│   ├── server.js               # Express server with API routes
│   └── .env                    # Environment variables (create this)
└── frontend/                   # Client-side application
    ├── index.html              # Main HTML structure
    ├── style.css               # Styling and responsive design
    └── script.js               # Frontend JavaScript logic
```

## Features

### Core Features
- **Recipe Search**: Search by ingredients, dish names, or keywords
- **Diet Filtering**: Filter results by dietary preferences (vegetarian, vegan, gluten-free, keto, paleo)
- **Recipe Details**: View complete ingredients, instructions, prep time, and servings
- **Favorites System**: Save and manage favorite recipes with browser storage
- **Cooking Timers**: Multiple countdown timers with notifications
- **Print Functionality**: Generate printer-friendly recipe formats

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Graceful error messages and fallback content
- **Interactive Elements**: Hover effects and smooth transitions
- **Toast Notifications**: User feedback for actions and timer alerts

## Setup and Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Text editor (VS Code recommended)
- Web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd recipe-finder
   ```

2. **Get API Key**
   - Visit [Spoonacular API](https://spoonacular.com/food-api)
   - Sign up for free account (100 requests/day free)
   - Copy your API key

3. **Set Up Environment Variables**
   - Create `.env` file in the `backend/` folder
   - Add your API key:
   ```env
   SPOONACULAR_API_KEY=your_actual_api_key_here
   PORT=5000
   ```

4. **Install and Start**
   ```bash
   npm start
   ```

5. **Access the Application**
   Open your browser and navigate to: `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Search Recipes
```
GET /api/recipes/search
```

**Parameters:**
- `query` (string): Search term for recipes
- `diet` (string): Diet filter (vegetarian, vegan, gluten free, ketogenic, paleo)
- `number` (integer): Number of results to return (default: 12)

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [...],
    "totalResults": 150
  }
}
```

#### 2. Get Recipe Details
```
GET /api/recipes/:id
```

**Parameters:**
- `id` (integer): Recipe ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 123456,
    "title": "Recipe Name",
    "readyInMinutes": 30,
    "servings": 4,
    "extendedIngredients": [...],
    "instructions": "...",
    "image": "https://..."
  }
}
```

#### 3. Health Check
```
GET /api/health
```

## Frontend Architecture

### Key Components

**Main JavaScript Functions:**
- `searchRecipes()`: Handles recipe search with filters
- `displayRecipes()`: Renders recipe cards dynamically
- `showRecipeModal()`: Displays detailed recipe information
- `toggleFavorite()`: Manages favorite recipes
- `startTimer()`: Creates cooking timers
- `printRecipe()`: Generates printable recipe format

**Event Handling:**
```javascript
// Example: Search on Enter key press
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
```

**DOM Manipulation:**
```javascript
// Example: Dynamic content generation
function createRecipeCard(recipe) {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <!-- More content -->
        </div>
    `;
}
```

## Backend Architecture

### Server Structure

**Express Setup:**
```javascript
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
```

**API Routes:**
- Modular route organization
- Async error handling with try-catch blocks
- Standardized JSON responses
- CORS configuration for cross-origin requests

**External API Integration:**
```javascript
const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
    params: { apiKey: API_KEY, query, diet }
});
```

## Key Learning Concepts

### 1. Asynchronous Programming
Understanding promises, async/await, and error handling:
```javascript
async function fetchData() {
    try {
        const response = await fetch('/api/recipes/search?query=pasta');
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### 2. DOM Manipulation
Dynamic content creation and event handling:
```javascript
function updateUI(data) {
    const container = document.getElementById('recipesContainer');
    container.innerHTML = data.map(recipe => createRecipeCard(recipe)).join('');
}
```

### 3. State Management
Managing application state without frameworks:
```javascript
let currentRecipes = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let timers = {};
```

### 4. Error Handling
Implementing user-friendly error handling:
```javascript
function showNotification(message, type = 'info') {
    // Create and display notification to user
}
```

### 5. API Integration
Making HTTP requests and processing responses:
```javascript
const params = new URLSearchParams({ query, diet });
const response = await fetch(`/api/recipes/search?${params}`);
```

## Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Write descriptive variable and function names
- Add comments for complex logic
- Follow ES6+ JavaScript conventions

### File Organization
- Keep HTML semantic and accessible
- Organize CSS with logical sections
- Structure JavaScript with clear function separation
- Use meaningful commit messages

### Testing Approach
- Test API endpoints with browser developer tools
- Verify responsive design on different screen sizes
- Check error handling with invalid inputs
- Test favorites persistence across browser sessions

## Troubleshooting

### Common Issues

#### Module Not Found Error
```
Error: Cannot find module 'express'
```
**Solution:** Run `cd backend && npm install`

#### API Key Issues
```
Failed to fetch recipes
```
**Solution:** 
- Check `.env` file exists in `backend/` folder
- Verify API key is correct (no extra spaces)
- Restart server after adding API key

#### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** 
- Kill existing process: `npx kill-port 5000`
- Or change PORT in `.env` file

#### CORS Errors
```
Access blocked by CORS policy
```
**Solution:** Ensure backend CORS is properly configured (already set up in this project)

### Development Tips

#### Browser Developer Tools
- **Network tab**: Monitor API calls and responses
- **Console tab**: Check for JavaScript errors
- **Elements tab**: Inspect DOM changes
- **Application tab**: View localStorage data

#### Debugging API Calls
Test endpoints directly in browser:
- `http://localhost:5000/api/health`
- `http://localhost:5000/api/recipes/search?query=chicken`

## Resources

### APIs Used
- [Spoonacular API Documentation](https://spoonacular.com/food-api/docs)
- [Spoonacular API Console](https://spoonacular.com/food-api/console)

### Learning Resources
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Development Tools
- **VS Code Extensions**: 
  - Live Server (for frontend testing)
  - Thunder Client (for API testing)
  - Prettier (for code formatting)
- **Browser Extensions**: 
  - React Developer Tools (for debugging)
  - JSON Formatter (for API response viewing)
