const WeatherAPI = {
    // Your Free API Key from OpenWeatherMap
    API_KEY: 'cebae4e516cf4376081849007f9f4a58', // Get from https://openweathermap.org/api
    BASE_URL: 'https://api.openweathermap.org/data/2.5',

    /**
     * Get current weather by city name
     */
    async getCurrentWeather(city, units = 'metric') {
        try {
            const response = await fetch(
                `${this.BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${this.API_KEY}`
            );

            if (!response.ok) {
                throw new Error('City not found');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get weather by coordinates (latitude, longitude)
     */
    async getWeatherByCoords(lat, lon, units = 'metric') {
        try {
            const response = await fetch(
                `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${this.API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Unable to fetch weather for coordinates');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get 5-day forecast
     */
    async getForecast(city, units = 'metric') {
        try {
            const response = await fetch(
                `${this.BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${this.API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Unable to fetch forecast');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get 5-day forecast by coordinates
     */
    async getForecastByCoords(lat, lon, units = 'metric') {
        try {
            const response = await fetch(
                `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${this.API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Unable to fetch forecast');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get weather alerts (requires city coordinates)
     */
    async getWeatherAlerts(lat, lon) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Unable to fetch alerts');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Validate API Key
     */
    async validateApiKey() {
        try {
            const response = await fetch(
                `${this.BASE_URL}/weather?q=London&appid=${this.API_KEY}`
            );
            return response.ok;
        } catch (error) {
            return false;
        }
    }
};