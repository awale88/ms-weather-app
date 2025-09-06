document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const searchCityBtn = document.getElementById('search-city');
    const getLocationBtn = document.getElementById('get-location');
    const searchCoordsBtn = document.getElementById('search-coords');
    const loadingElement = document.getElementById('loading');
    const weatherDisplay = document.getElementById('weather-display');
    const errorMessage = document.getElementById('error-message');
    
    // Reset button for City tab
document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('city-input').value = '';
    resetWeatherDisplay();
});

// Reset button for Location tab
document.getElementById('reset-location').addEventListener('click', () => {
    resetWeatherDisplay();
});

// Reset button for Coordinates tab
document.getElementById('reset-coords').addEventListener('click', () => {
    document.getElementById('lat-input').value = '';
    document.getElementById('lon-input').value = '';
    resetWeatherDisplay();
});

// Helper function to reset weather and error display
function resetWeatherDisplay() {
    weatherDisplay.classList.remove('active');
    errorMessage.classList.remove('active');
}
        
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Search by city
    searchCityBtn.addEventListener('click', () => {
        const cityInput = document.getElementById('city-input');
        const cityName = cityInput.value.trim();

        if (cityName) {
            fetchWeather(`/api/weather/city/${encodeURIComponent(cityName)}`);
        } else {
            showError('Please enter a city name');
        }
    });

    // Get current location weather
    getLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            loadingElement.classList.add('active');
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeather(`/api/weather/coordinates?lat=${lat}&lon=${lon}`);
                },
                error => {
                    loadingElement.classList.remove('active');
                    showError('Unable to retrieve your location: ' + error.message);
                }
            );
        } else {
            showError('Geolocation is not supported by this browser');
        }
    });

    // Search by coordinates
    searchCoordsBtn.addEventListener('click', () => {
        const latInput = document.getElementById('lat-input');
        const lonInput = document.getElementById('lon-input');
        const lat = latInput.value.trim();
        const lon = lonInput.value.trim();

        if (lat && lon) {
            fetchWeather(`/api/weather/coordinates?lat=${lat}&lon=${lon}`);
        } else {
            showError('Please enter both latitude and longitude');
        }
    });

    // Fetch weather data from API
    function fetchWeather(url) {
        loadingElement.classList.add('active');
        weatherDisplay.classList.remove('active');
        errorMessage.classList.remove('active');

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    displayWeather(data.data);
                } else {
                    throw new Error(data.message || 'Unknown error occurred');
                }
            })
            .catch(error => {
                showError('Error fetching weather data: ' + error.message);
            })
            .finally(() => {
                loadingElement.classList.remove('active');
            });
    }

    // Display weather data
    function displayWeather(weatherData) {
        // Update current weather
        document.getElementById('city-name').textContent = weatherData.name;
        document.getElementById('country-name').textContent = weatherData.sys.country;
        document.getElementById('temperature').textContent = `${Math.round(weatherData.main.temp)}°C`;
        document.getElementById('weather-description').textContent =
            weatherData.weather[0].description.charAt(0).toUpperCase() +
            weatherData.weather[0].description.slice(1);
        document.getElementById('feels-like').textContent = `${Math.round(weatherData.main.feels_like)}°C`;
        document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `${weatherData.wind.speed} m/s`;
        document.getElementById('pressure').textContent = `${weatherData.main.pressure} hPa`;

        // Set weather icon
        const weatherIcon = document.getElementById('weather-icon');
        const iconCode = weatherData.weather[0].icon;
        setWeatherIcon(weatherIcon, iconCode);

        // Update date and time
        const now = new Date();
        document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit'
        });

        // Show weather display
        weatherDisplay.classList.add('active');
    }

    // Set weather icon based on condition code
    function setWeatherIcon(element, iconCode) {
        // Clear previous classes
        element.className = '';

        // Add base class
        element.classList.add('fas');

        // Map icon codes to Font Awesome icons
        const iconMap = {
            '01d': 'fa-sun',
            '01n': 'fa-moon',
            '02d': 'fa-cloud-sun',
            '02n': 'fa-cloud-moon',
            '03d': 'fa-cloud',
            '03n': 'fa-cloud',
            '04d': 'fa-cloud',
            '04n': 'fa-cloud',
            '09d': 'fa-cloud-showers-heavy',
            '09n': 'fa-cloud-showers-heavy',
            '10d': 'fa-cloud-sun-rain',
            '10n': 'fa-cloud-moon-rain',
            '11d': 'fa-bolt',
            '11n': 'fa-bolt',
            '13d': 'fa-snowflake',
            '13n': 'fa-snowflake',
            '50d': 'fa-smog',
            '50n': 'fa-smog'
        };

        // Set appropriate icon
        element.classList.add(iconMap[iconCode] || 'fa-cloud');
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('active');
        weatherDisplay.classList.remove('active');
    }
});