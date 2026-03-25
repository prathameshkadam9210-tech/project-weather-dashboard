# 🌦️ Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from OpenWeatherMap API.

## Features

✨ **Core Features**
- 🔍 Search weather by city name
- 📍 Geolocation support
- 🌡️ Real-time temperature, humidity, wind speed
- 📊 5-day weather forecast
- ⏰ Hourly forecast (next 24 hours)
- 🌅 Sunrise and sunset times
- 🌙 Dark mode support
- °C/°F unit toggle
- 📱 Fully responsive design

🎨 **User Experience**
- Modern, clean UI with Bootstrap
- Smooth animations and transitions
- Toast notifications
- Search history with suggestions
- Loading indicators
- Error handling

🔒 **Technical**
- No backend required
- Free API (OpenWeatherMap)
- LocalStorage for preferences
- Debounced search
- Responsive CSS Grid

## Installation

### 1. Get an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API keys section and copy your key

### 2. Setup

```bash
# Clone or download this project
cd weather-dashboard

# Open the config file
# Edit js/weather-api.js and replace:
# API_KEY: 'YOUR_API_KEY_HERE'
# with your actual API key
```

### 3. Run Locally

**Option 1: Direct (Simple)**
```bash
# Just open index.html in your browser
open index.html
```

**Option 2: Local Server (Recommended)**
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js (with http-server)
npx http-server

# Then visit: http://localhost:8000
```

## Usage

1. **Search**: Enter a city name and click search
2. **Geolocation**: Click the location button to use your current location
3. **Toggle Units**: Click °C/°F to switch between Celsius and Fahrenheit
4. **Dark Mode**: Click the moon icon to toggle dark mode
5. **Search History**: Recently searched cities appear as suggestions

## Project Structure

```
weather-dashboard/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main styles
│   └── responsive.css      # Responsive styles
├── js/
│   ├── app.js              # Main application logic
│   ├── weather-api.js      # API handler
│   ├── storage.js          # LocalStorage utilities
│   └── utils.js            # Utility functions
├── images/                 # Images and assets
└── README.md
```

## API Used

- **OpenWeatherMap** - Free weather API
  - Endpoint: `api.openweathermap.org/data/2.5`
  - Current Weather, Forecast, Geolocation support
  - Free tier: 1000 requests/day

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Explained

### Search Weather
- Enter any city name
- Get current weather conditions
- See 5-day forecast
- View hourly trends

### Geolocation
- Click location button
- Automatic weather for your location
- Requires permission grant

### Units Toggle
- Switch between °C and °F
- Settings saved locally
- Applies to all temperatures

### Dark Mode
- Toggle with moon icon
- Saves preference
- Reduces eye strain

### Search History
- Suggestions from recent searches
- Quick access to frequently checked cities
- Autocomplete feature

## Customization

### Change Colors
Edit `css/styles.css` and modify CSS variables:
```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #10b981;
    /* ... */
}
```

### Change Default Theme
In `js/storage.js`, modify:
```javascript
getTheme() {
    return localStorage.getItem(this.KEYS.THEME) || 'light'; // Change to 'dark'
}
```

### Change Units
In `js/storage.js`:
```javascript
getUnit() {
    return localStorage.getItem(this.KEYS.UNIT) || 'metric'; // Change to 'imperial'
}
```

## Troubleshooting

### API Key Error
- **Issue**: "Please set your OpenWeatherMap API key"
- **Solution**: Update `API_KEY` in `js/weather-api.js`

### City Not Found
- **Issue**: Error when searching for a city
- **Solution**: Try different spelling or use country code (e.g., "New York, US")

### Geolocation Not Working
- **Issue**: Location button doesn't work
- **Solution**: 
  - Check browser permissions
  - Must be on HTTPS or localhost
  - Grant location permission when prompted

### Forecast Not Showing
- **Issue**: 5-day forecast doesn't appear
- **Solution**: 
  - Wait a moment for data to load
  - Check API key is valid
  - Ensure city was found

## Performance Tips

1. **API Rate Limiting**: Free tier is limited to 1000 requests/day
2. **Caching**: Consider implementing API response caching
3. **Offline Support**: Add Service Worker for offline functionality
4. **Image Optimization**: Cache weather icons locally

## Future Enhancements

- [ ] Weather alerts notifications
- [ ] Air quality index
- [ ] UV index
- [ ] Pollen forecast
- [ ] Multiple city comparison
- [ ] Weather history/trends
- [ ] Save favorite cities
- [ ] Widget embed support
- [ ] PWA (Progressive Web App)
- [ ] Maps integration

## License

MIT License - Feel free to use and modify

## Credits

- **Weather Data**: [OpenWeatherMap](https://openweathermap.org/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Framework**: [Bootstrap](https://getbootstrap.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)

## Support

Found a bug or have suggestions?
- Open an issue
- Check existing issues first
- Provide detailed description

## Author

Weather Dashboard © 2026

---

**Happy weather checking!** 🌤️