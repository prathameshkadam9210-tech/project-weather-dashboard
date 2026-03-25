const Utils = {
    // Wind Direction
    getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    },

    // Format Temperature
    formatTemp(temp, unit = 'metric') {
        return Math.round(temp);
    },

    // Format Wind Speed (convert m/s to km/h)
    formatWindSpeed(speed) {
        return (speed * 3.6).toFixed(1);
    },

    // Format Time
    formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    },

    // Format Date
    formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    },

    // Get Weather Icon (Font Awesome)
    getWeatherIcon(iconCode, description) {
        const iconMap = {
            '01d': 'fas fa-sun',
            '01n': 'fas fa-moon',
            '02d': 'fas fa-cloud-sun',
            '02n': 'fas fa-cloud-moon',
            '03d': 'fas fa-cloud',
            '03n': 'fas fa-cloud',
            '04d': 'fas fa-cloud',
            '04n': 'fas fa-cloud',
            '09d': 'fas fa-cloud-rain',
            '09n': 'fas fa-cloud-rain',
            '10d': 'fas fa-cloud-sun-rain',
            '10n': 'fas fa-cloud-moon-rain',
            '11d': 'fas fa-bolt',
            '11n': 'fas fa-bolt',
            '13d': 'fas fa-snowflake',
            '13n': 'fas fa-snowflake',
            '50d': 'fas fa-smog',
            '50n': 'fas fa-smog'
        };
        return iconMap[iconCode] || 'fas fa-cloud';
    },

    // Get Weather Color
    getWeatherColor(description) {
        const desc = description.toLowerCase();
        if (desc.includes('rain')) return '#3b82f6';
        if (desc.includes('cloud')) return '#9ca3af';
        if (desc.includes('clear') || desc.includes('sunny')) return '#fbbf24';
        if (desc.includes('snow')) return '#e0f2fe';
        if (desc.includes('thunder')) return '#8b5cf6';
        if (desc.includes('mist') || desc.includes('fog')) return '#d1d5db';
        return '#10b981';
    },

    // Show Notification
    showNotification(message, type = 'info') {
        const alertEl = document.getElementById('errorAlert');
        const msgEl = document.getElementById('errorMsg');
        
        msgEl.textContent = message;
        alertEl.className = `alert alert-${type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`;
        alertEl.classList.remove('d-none');

        setTimeout(() => {
            alertEl.classList.add('d-none');
        }, 5000);
    },

    // Show Loading
    showLoading(show = true) {
        const spinner = document.getElementById('loadingSpinner');
        if (show) {
            spinner.classList.remove('d-none');
        } else {
            spinner.classList.add('d-none');
        }
    },

    // Hide Welcome Screen
    hideWelcome() {
        document.getElementById('welcomeScreen').style.display = 'none';
    },

    // Show Weather Content
    showWeatherContent(show = true) {
        const content = document.getElementById('weatherContent');
        if (show) {
            content.classList.remove('d-none');
        } else {
            content.classList.add('d-none');
        }
    },

    // Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};