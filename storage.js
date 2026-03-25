const Storage = {
    // Keys
    KEYS: {
        RECENT_SEARCHES: 'weatherDashboard_recentSearches',
        THEME: 'weatherDashboard_theme',
        UNIT: 'weatherDashboard_unit',
        FAVORITES: 'weatherDashboard_favorites'
    },

    // Recent Searches
    addRecentSearch(city) {
        let searches = this.getRecentSearches();
        searches = searches.filter(c => c.toLowerCase() !== city.toLowerCase());
        searches.unshift(city);
        searches = searches.slice(0, 10);
        localStorage.setItem(this.KEYS.RECENT_SEARCHES, JSON.stringify(searches));
    },

    getRecentSearches() {
        const searches = localStorage.getItem(this.KEYS.RECENT_SEARCHES);
        return searches ? JSON.parse(searches) : [];
    },

    clearRecentSearches() {
        localStorage.removeItem(this.KEYS.RECENT_SEARCHES);
    },

    // Theme
    setTheme(theme) {
        localStorage.setItem(this.KEYS.THEME, theme);
    },

    getTheme() {
        return localStorage.getItem(this.KEYS.THEME) || 'light';
    },

    // Unit (Celsius/Fahrenheit)
    setUnit(unit) {
        localStorage.setItem(this.KEYS.UNIT, unit);
    },

    getUnit() {
        return localStorage.getItem(this.KEYS.UNIT) || 'metric';
    },

    // Favorites
    addFavorite(city) {
        let favorites = this.getFavorites();
        if (!favorites.includes(city)) {
            favorites.push(city);
            localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
        }
    },

    removeFavorite(city) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(c => c !== city);
        localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
    },

    getFavorites() {
        const favorites = localStorage.getItem(this.KEYS.FAVORITES);
        return favorites ? JSON.parse(favorites) : [];
    },

    isFavorite(city) {
        return this.getFavorites().includes(city);
    }
};