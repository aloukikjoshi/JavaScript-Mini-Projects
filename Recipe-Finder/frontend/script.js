// API Configuration - Now points to same origin since backend serves frontend
const API_BASE_URL = '/api';

// Global state
let currentRecipes = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let timers = {};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recipesContainer = document.getElementById('recipesContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const filterBtns = document.querySelectorAll('.filter-btn');
const favoritesBtn = document.getElementById('favoritesBtn');
const sectionTitle = document.getElementById('sectionTitle');
const activeTimersContainer = document.getElementById('activeTimers');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateFavoritesUI();
    showNotification('Welcome to Recipe Finder! Search for recipes or browse your favorites.', 'info');
});

// Event Listeners Setup
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });

    // Favorites button
    if (favoritesBtn) {
        favoritesBtn.addEventListener('click', showFavorites);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('recipeModal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Search Handler
async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        showNotification('Please enter a search term', 'error');
        return;
    }

    const activeFilter = document.querySelector('.filter-btn.active');
    const diet = activeFilter ? activeFilter.dataset.diet : '';

    await searchRecipes(query, diet);
}

// Filter Click Handler
function handleFilterClick(e) {
    // Toggle active state
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // If there's a current search, re-run it with the new filter
    const query = searchInput.value.trim();
    if (query) {
        const diet = e.target.dataset.diet;
        searchRecipes(query, diet);
    }
}

// API Functions
async function searchRecipes(query, diet = '', intolerances = '') {
    showLoading(true);
    sectionTitle.textContent = `Search Results: "${query}"`;
    
    try {
        const params = new URLSearchParams({
            query,
            number: 12
        });

        if (diet) params.append('diet', diet);
        if (intolerances) params.append('intolerances', intolerances);

        const response = await fetch(`${API_BASE_URL}/recipes/search?${params}`);
        const result = await response.json();

        if (result.success) {
            currentRecipes = result.data.results || [];
            displayRecipes(currentRecipes);
        } else {
            throw new Error(result.message || 'Failed to fetch recipes');
        }
    } catch (error) {
        console.error('Search error:', error);
        showNotification('Failed to search recipes. Please try again.', 'error');
        displayRecipes([]);
    } finally {
        showLoading(false);
    }
}

async function loadRandomRecipes() {
    showNotification('Search for recipes using the search bar above!', 'info');
}

async function getRecipeDetails(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
        const result = await response.json();

        if (result.success) {
            return result.data;
        } else {
            throw new Error(result.message || 'Failed to fetch recipe details');
        }
    } catch (error) {
        console.error('Recipe details error:', error);
        showNotification('Failed to load recipe details', 'error');
        return null;
    }
}

// Display Functions
function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
        recipesContainer.innerHTML = '<p class="no-results">No recipes found. Try a different search term or filter.</p>';
        return;
    }

    recipesContainer.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
}

function createRecipeCard(recipe) {
    const isFavorite = favorites.includes(recipe.id);
    const heartClass = isFavorite ? 'favorite' : '';
    
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-image">
                <img src="${recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                     alt="${recipe.title}" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <button class="favorite-btn ${heartClass}" onclick="toggleFavorite(${recipe.id})">
                    ❤️
                </button>
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-info">
                    <span class="prep-time">⏱️ ${recipe.readyInMinutes || 'N/A'} min</span>
                    <span class="servings">👥 ${recipe.servings || 'N/A'} servings</span>
                </div>
                <div class="recipe-actions">
                    <button class="btn btn-primary" onclick="showRecipeModal(${recipe.id})">
                        View Recipe
                    </button>
                    <button class="btn btn-secondary" onclick="startTimer(${recipe.readyInMinutes || 30})">
                        Start Timer
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Modal Functions
async function showRecipeModal(id) {
    const modal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('modalContent');
    
    modal.style.display = 'block';
    modalContent.innerHTML = '<div class="loading">Loading recipe details...</div>';

    const recipe = await getRecipeDetails(id);
    if (!recipe) {
        modalContent.innerHTML = '<div class="error">Failed to load recipe details</div>';
        return;
    }

    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${recipe.title}</h2>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="recipe-image-large">
                <img src="${recipe.image || 'https://via.placeholder.com/600x400?text=No+Image'}" 
                     alt="${recipe.title}"
                     onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
            </div>
            <div class="recipe-meta">
                <div class="meta-item">
                    <strong>⏱️ Prep Time:</strong> ${recipe.readyInMinutes || 'N/A'} minutes
                </div>
                <div class="meta-item">
                    <strong>👥 Servings:</strong> ${recipe.servings || 'N/A'}
                </div>
                <div class="meta-item">
                    <strong>🍽️ Dish Types:</strong> ${recipe.dishTypes ? recipe.dishTypes.join(', ') : 'N/A'}
                </div>
            </div>
            
            <div class="recipe-section">
                <h3>📝 Ingredients</h3>
                <ul class="ingredients-list">
                    ${recipe.extendedIngredients ? 
                        recipe.extendedIngredients.map(ing => 
                            `<li>${ing.original}</li>`
                        ).join('') : 
                        '<li>Ingredients not available</li>'
                    }
                </ul>
            </div>

            <div class="recipe-section">
                <h3>👩‍🍳 Instructions</h3>
                <div class="instructions">
                    ${recipe.instructions ? 
                        recipe.instructions.replace(/\n/g, '<br>') : 
                        recipe.analyzedInstructions && recipe.analyzedInstructions[0] ? 
                        recipe.analyzedInstructions[0].steps.map((step, index) => 
                            `<p><strong>Step ${index + 1}:</strong> ${step.step}</p>`
                        ).join('') :
                        '<p>Instructions not available</p>'
                    }
                </div>
            </div>

            <div class="modal-actions">
                <button class="btn btn-primary" onclick="toggleFavorite(${recipe.id})">
                    ${favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button class="btn btn-secondary" onclick="startTimer(${recipe.readyInMinutes || 30})">
                    Start Cooking Timer
                </button>
                <button class="btn btn-outline" onclick="printRecipe(${recipe.id})">
                    🖨️ Print Recipe
                </button>
            </div>
        </div>
    `;
}

function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

// Favorites Functions
async function showFavorites() {
    if (favorites.length === 0) {
        sectionTitle.textContent = 'My Favorites';
        recipesContainer.innerHTML = '<p class="no-results">No favorite recipes yet. Start adding some! ❤️</p>';
        return;
    }

    showLoading(true);
    sectionTitle.textContent = 'My Favorites';
    
    try {
        const favoriteRecipes = [];
        
        // Fetch details for each favorite recipe
        for (const id of favorites) {
            const recipe = await getRecipeDetails(id);
            if (recipe) {
                favoriteRecipes.push(recipe);
            }
        }
        
        currentRecipes = favoriteRecipes;
        displayRecipes(currentRecipes);
    } catch (error) {
        console.error('Error loading favorites:', error);
        showNotification('Failed to load favorite recipes', 'error');
    } finally {
        showLoading(false);
    }
}

function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites', 'success');
        
        // If currently viewing favorites, refresh the view
        if (sectionTitle.textContent === 'My Favorites') {
            showFavorites();
        }
    } else {
        favorites.push(id);
        showNotification('Added to favorites', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesUI();
}

function updateFavoritesUI() {
    // Update favorite buttons in recipe cards
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const recipeId = parseInt(btn.closest('.recipe-card').dataset.id);
        btn.classList.toggle('favorite', favorites.includes(recipeId));
    });
}

// Timer Functions
function startTimer(minutes) {
    if (!minutes || minutes <= 0) {
        showNotification('Invalid timer duration', 'error');
        return;
    }

    const timerId = Date.now();
    const endTime = Date.now() + (minutes * 60 * 1000);
    
    timers[timerId] = {
        endTime,
        minutes,
        interval: setInterval(() => updateTimer(timerId), 1000)
    };

    showNotification(`Timer started for ${minutes} minutes`, 'success');
    updateTimer(timerId);
    displayActiveTimers();
}

function updateTimer(timerId) {
    const timer = timers[timerId];
    if (!timer) return;

    const remaining = timer.endTime - Date.now();
    
    if (remaining <= 0) {
        clearInterval(timer.interval);
        delete timers[timerId];
        showNotification('⏰ Timer finished! Your dish is ready!', 'success', 5000);
        displayActiveTimers();
        
        // Play notification sound if supported
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Timer Finished!', {
                body: 'Your cooking timer has finished. Check your dish!',
                icon: '/favicon.ico'
            });
        }
        return;
    }

    displayActiveTimers();
}

function displayActiveTimers() {
    if (!activeTimersContainer) return;
    
    const activeTimerIds = Object.keys(timers);
    
    if (activeTimerIds.length === 0) {
        activeTimersContainer.innerHTML = '';
        activeTimersContainer.style.display = 'none';
        return;
    }
    
    activeTimersContainer.style.display = 'block';
    activeTimersContainer.innerHTML = `
        <div class="timers-header">
            <h3>🍳 Active Cooking Timers</h3>
        </div>
        <div class="timers-list">
            ${activeTimerIds.map(timerId => {
                const timer = timers[timerId];
                const remaining = timer.endTime - Date.now();
                const minutes = Math.floor(remaining / 60000);
                const seconds = Math.floor((remaining % 60000) / 1000);
                
                return `
                    <div class="timer-item">
                        <div class="timer-info">
                            <span class="timer-duration">${timer.minutes} min timer</span>
                            <span class="timer-remaining">${minutes}:${seconds.toString().padStart(2, '0')}</span>
                        </div>
                        <button class="timer-cancel" onclick="cancelTimer('${timerId}')">✕</button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function cancelTimer(timerId) {
    if (timers[timerId]) {
        clearInterval(timers[timerId].interval);
        delete timers[timerId];
        showNotification('Timer cancelled', 'info');
        displayActiveTimers();
    }
}

// Utility Functions
function showLoading(show) {
    if (loadingSpinner) {
        loadingSpinner.style.display = show ? 'block' : 'none';
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, duration);
}

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}
async function printRecipe(id) {
    const recipe = await getRecipeDetails(id);
    if (!recipe) {
        showNotification('Failed to load recipe for printing', 'error');
        return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${recipe.title} - Recipe</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                .recipe-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                .recipe-meta { display: flex; justify-content: space-around; margin: 20px 0; background: #f5f5f5; padding: 15px; }
                .ingredients { margin: 20px 0; }
                .ingredients ul { list-style-type: none; padding: 0; }
                .ingredients li { padding: 5px 0; border-bottom: 1px solid #eee; }
                .instructions { margin: 20px 0; line-height: 1.6; }
                h1 { color: #333; font-size: 2em; }
                h2 { color: #666; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <div class="recipe-header">
                <h1>${recipe.title}</h1>
                <p>Generated from Recipe Finder</p>
            </div>
            
            <div class="recipe-meta">
                <div><strong>⏱️ Prep Time:</strong> ${recipe.readyInMinutes || 'N/A'} minutes</div>
                <div><strong>👥 Servings:</strong> ${recipe.servings || 'N/A'}</div>
                <div><strong>🍽️ Dish Types:</strong> ${recipe.dishTypes ? recipe.dishTypes.join(', ') : 'N/A'}</div>
            </div>

            <div class="ingredients">
                <h2>📝 Ingredients</h2>
                <ul>
                    ${recipe.extendedIngredients ? 
                        recipe.extendedIngredients.map(ing => `<li>• ${ing.original}</li>`).join('') : 
                        '<li>Ingredients not available</li>'
                    }
                </ul>
            </div>

            <div class="instructions">
                <h2>👩‍🍳 Instructions</h2>
                ${recipe.instructions ? 
                    recipe.instructions.replace(/\n/g, '<br><br>') : 
                    recipe.analyzedInstructions && recipe.analyzedInstructions[0] ? 
                    recipe.analyzedInstructions[0].steps.map((step, index) => 
                        `<p><strong>Step ${index + 1}:</strong> ${step.step}</p>`
                    ).join('') :
                    '<p>Instructions not available</p>'
                }
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Give the window time to load before printing
    setTimeout(() => {
        printWindow.print();
    }, 250);
}