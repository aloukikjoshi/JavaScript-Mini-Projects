# 🌦️ Weather Website 🌦️

📚 **Technologies Used** 📚

- **JavaScript (ES6+)**: The primary language used for creating this project.
- **HTML5**: Used to structure the content on the webpage.
- **CSS3**: Used for styling the webpage.
- **Font Awesome icons**: Used for user interface elements.
- **OpenWeatherMap API**: Used to fetch real-time weather data.

🎯 **Purpose of this Project** 🎯

This project is a part of the JavaScript-Mini-Projects repository. The main goal of this project is to demonstrate the use of JavaScript for creating a Weather Application. It showcases the use of JavaScript DOM manipulation, API integration, and responsive design.

📂 **Project Structure** 📂

This project is contained in its own directory. Here is a brief overview of the project structure:

- `index.html`: This file contains the HTML structure of the project.
- `script.js`: This file contains the JavaScript code for the project.
- `style.css`: This file contains the CSS styles for the project.
- `assets/`: Directory containing weather icons and error image.

🚀 **How to Run this Project** 🚀

1. **Clone the repository** and navigate to the Weather Website directory:
   ```sh
   git clone https://github.com/your-username/JavaScript-Mini-Projects.git
   cd JavaScript-Mini-Projects/weather\ website
   ```

2. **Open index.html in your browser**:
   - Open the file in your preferred web browser.

3. **Use the application**:
   - Enter a city name in the search box and click the search button.
   - View the current weather conditions including temperature, description, humidity, and wind speed.

🔑 **API Configuration** 🔑

This project uses the OpenWeatherMap API to fetch weather data. You'll need to:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Open the `script.js` file
3. Replace the existing API key with your own:

```javascript
const api_key = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key
```

🌈 **Weather Icons** 🌈

The application displays different weather icons based on the current weather condition:

- Clouds
- Clear
- Rain
- Mist
- Snow

✨ **Features** ✨

- Search for weather information by city name
- Display current temperature in Celsius
- Show weather condition with descriptive icons
- Display humidity percentage
- Show wind speed in Km/H
- Responsive design for various screen sizes
- Error handling for city not found
