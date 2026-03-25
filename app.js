class WeatherDashboard {
    constructor() {
        this.currentWeather = null;
        this.forecast = null;
        this.unit = Storage.getUnit();
        this.theme = Storage.getTheme();
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.setupGeolocation();
        this.checkApiKey();
    }

    setupTheme() {
        if (this.theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    setupEventListeners() {
        // Search
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());
        document.getElementById('cityInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Search with autocomplete
        document.getElementById('cityInput').addEventListener('input', (e) => {
            if (e.target.value.length > 2) {
                this.showSuggestions(e.target.value);
            }
        });

        // Geolocation
        document.getElementById('geoBtn').addEventListener('click', () => this.handleGeolocation());

        // Units Toggle
        document.getElementById('unitsToggle').addEventListener('click', () => this.toggleUnits());

        // Theme Toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
    }

    setupGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('Geolocation enabled');
                    document.getElementById('geoBtn').style.cursor = 'pointer';
                },
                (error) => {
                    console.warn('Geolocation not available:', error);
                    document.getElementById('geoBtn').disabled = true;
                    document.getElementById('geoBtn').style.opacity = '0.5';
                }
            );
        }
    }

    checkApiKey() {
        if (WeatherAPI.API_KEY === 'YOUR_API_KEY_HERE') {
            Utils.showNotification(
                'Please set your OpenWeatherMap API key in js/weather-api.js',
                'error'
            );
        }
    }

    async handleSearch() {
        const city = document.getElementById('cityInput').value.trim();
        
        if (!city) {
            Utils.showNotification('Please enter a city name', 'info');
            return;
        }

        await this.fetchWeatherData(city);
    }

    async fetchWeatherData(city) {
        Utils.showLoading(true);
        Utils.hideWelcome();

        try {
            const units = this.unit === 'imperial' ? 'imperial' : 'metric';
            
            // Fetch current weather and forecast
            [this.currentWeather, this.forecast] = await Promise.all([
                WeatherAPI.getCurrentWeather(city, units),
                WeatherAPI.getForecast(city, units)
            ]);

            // Save search and update UI
            Storage.addRecentSearch(city);
            document.getElementById('cityInput').value = '';
            document.getElementById('suggestionsList').classList.add('d-none');

            this.renderCurrentWeather();
            this.renderForecast();
            this.renderHourlyForecast();
            this.renderSunAndMoon();

            Utils.showWeatherContent(true);
            Utils.showLoading(false);
        } catch (error) {
            Utils.showLoading(false);
            Utils.showNotification(error.message || 'Error fetching weather data', 'error');
        }
    }

    async handleGeolocation() {
        if (!navigator.geolocation) {
            Utils.showNotification('Geolocation not supported', 'error');
            return;
        }

        Utils.showLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const units = this.unit === 'imperial' ? 'imperial' : 'metric';
                    
                    [this.currentWeather, this.forecast] = await Promise.all([
                        WeatherAPI.getWeatherByCoords(latitude, longitude, units),
                        WeatherAPI.getForecastByCoords(latitude, longitude, units)
                    ]);

                    Utils.hideWelcome();
                    this.renderCurrentWeather();
                    this.renderForecast();
                    this.renderHourlyForecast();
                    this.renderSunAndMoon();

                    Utils.showWeatherContent(true);
                    Utils.showLoading(false);
                    Utils.showNotification(`Weather loaded for ${this.currentWeather.name}`, 'success');
                } catch (error) {
                    Utils.showLoading(false);
                    Utils.showNotification('Error fetching weather', 'error');
                }
            },
            (error) => {
                Utils.showLoading(false);
                Utils.showNotification('Unable to get your location', 'error');
            }
        );
    }

    renderCurrentWeather() {
        const { main, weather, sys, wind, clouds, visibility } = this.currentWeather;
        const weatherIcon = Utils.getWeatherIcon(weather[0].icon, weather[0].main);

        // Update DOM
        document.getElementById('weatherIcon').innerHTML = `<i class="${weatherIcon}"></i>`;
        document.getElementById('weatherDescription').textContent = weather[0].description.toUpperCase();
        document.getElementById('currentTemp').textContent = Utils.formatTemp(main.temp, this.unit);
        document.getElementById('feelsLike').textContent = Utils.formatTemp(main.feels_like, this.unit);
        document.getElementById('locationInfo').textContent = `${this.currentWeather.name}, ${sys.country}`;
        document.getElementById('updateTime').textContent = `Updated: ${new Date().toLocaleTimeString()}`;

        // Details
        document.getElementById('humidity').textContent = `${main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${Utils.formatWindSpeed(wind.speed)} km/h`;
        document.getElementById('windDirection').textContent = `${Utils.getWindDirection(wind.deg)} (${wind.deg}°)`;
        document.getElementById('pressure').textContent = `${main.pressure} hPa`;
        document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
        document.getElementById('cloudiness').textContent = `${clouds.all}%`;

        // Unit symbol
        const unitSymbol = this.unit === 'imperial' ? 'F' : 'C';
        document.getElementById('unitSymbol').textContent = unitSymbol;
        document.getElementById('feelsLikeUnit').textContent = unitSymbol;
    }

    renderForecast() {
        const forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = '';

        // Get daily forecasts (one per day)
        const dailyForecasts = {};
        this.forecast.list.forEach(forecast => {
            const date = forecast.dt_txt.split(' ')[0];
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = forecast;
            }
        });

        // Show next 5 days
        Object.values(dailyForecasts).slice(0, 5).forEach((forecast, index) => {
            const { main, weather, dt } = forecast;
            const icon = Utils.getWeatherIcon(weather[0].icon, weather[0].main);
            const unitSymbol = this.unit === 'imperial' ? 'F' : 'C';

            const card = document.createElement('div');
            card.className = 'col-md-2 col-sm-4 col-6 mb-3';
            card.innerHTML = `
                <div class="forecast-card">
                    <div class="forecast-date">${Utils.formatDate(dt)}</div>
                    <div class="forecast-icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="forecast-temp-range">
                        <div class="forecast-max">
                            <div class="forecast-max-label">Max</div>
                            <div class="forecast-max-temp">${Utils.formatTemp(main.temp_max, this.unit)}°${unitSymbol}</div>
                        </div>
                        <div class="forecast-min">
                            <div class="forecast-min-label">Min</div>
                            <div class="forecast-min-temp">${Utils.formatTemp(main.temp_min, this.unit)}°${unitSymbol}</div>
                        </div>
                    </div>
                    <div class="forecast-description">${weather[0].main}</div>
                </div>
            `;
            forecastContainer.appendChild(card);
        });
    }

    renderHourlyForecast() {
        const hourlyContainer = document.getElementById('hourlyForecast');
        hourlyContainer.innerHTML = '';

        const unitSymbol = this.unit === 'imperial' ? 'F' : 'C';

        // Show next 24 hours
        this.forecast.list.slice(0, 8).forEach((forecast) => {
            const { main, weather, dt } = forecast;
            const icon = Utils.getWeatherIcon(weather[0].icon, weather[0].main);

            const item = document.createElement('div');
            item.className = 'col-auto mb-2';
            item.innerHTML = `
                <div class="hourly-item">
                    <div class="hourly-time">${Utils.formatTime(dt)}</div>
                    <div class="hourly-icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="hourly-temp">${Utils.formatTemp(main.temp, this.unit)}°${unitSymbol}</div>
                </div>
            `;
            hourlyContainer.appendChild(item);
        });
    }

    renderSunAndMoon() {
        const { sys } = this.currentWeather;

        document.getElementById('sunrise').textContent = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        document.getElementById('sunset').textContent = new Date(sys.sunset * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const unitSymbol = this.unit === 'imperial' ? 'F' : 'C';
        document.getElementById('maxTemp').textContent = `${Utils.formatTemp(this.currentWeather.main.temp_max, this.unit)}°${unitSymbol}`;
        document.getElementById('minTemp').textContent = `${Utils.formatTemp(this.currentWeather.main.temp_min, this.unit)}°${unitSymbol}`;
    }

    showSuggestions(query) {
        const recentSearches = Storage.getRecentSearches();
        const filtered = recentSearches.filter(c => c.toLowerCase().includes(query.toLowerCase()));

        const suggestionsList = document.getElementById('suggestionsList');
        if (filtered.length === 0) {
            suggestionsList.classList.add('d-none');
            return;
        }

        suggestionsList.innerHTML = filtered.map(city => `
            <div class="suggestion-item" onclick="dashboard.selectSuggestion('${city}')">
                <i class="fas fa-history"></i> ${city}
            </div>
        `).join('');

        suggestionsList.classList.remove('d-none');
    }

    selectSuggestion(city) {
        document.getElementById('cityInput').value = city;
        document.getElementById('suggestionsList').classList.add('d-none');
        this.handleSearch();
    }

    toggleUnits() {
        this.unit = this.unit === 'metric' ? 'imperial' : 'metric';
        Storage.setUnit(this.unit);

        const unitText = document.getElementById('unitText');
        unitText.textContent = this.unit === 'metric' ? '°C' : '°F';

        if (this.currentWeather) {
            this.fetchWeatherData(this.currentWeather.name);
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        this.theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        Storage.setTheme(this.theme);

        const themeToggle = document.getElementById('themeToggle');
        if (this.theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}

// Initialize Dashboard
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new WeatherDashboard();
});