document.addEventListener("DOMContentLoaded", () => {    
    const weatherForm = document.querySelector(".weatherForm");
    const cityInput = document.querySelector(".cityInput");
    const card = document.querySelector(".weatherCard");
    const forecastContainer = document.querySelector('.forecast');
    const apiKey = "63d4f4ae7dbaca29780e9220b1b3011f";

    const lat = "49.75";
    const lon = "6.64";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    weatherForm.addEventListener("submit", async eventv => {

        event.preventDefault();

        const city = cityInput.value;

        if(city){
            try{
                const weatherData = await getWeatherData(city);
                const forecastDataCity = await forecastCityFetch(city);
                displayWeatherInfo(weatherData);
                displayForecast(forecastDataCity);
            }
            catch(error){
                console.error(error);
                displayError("Sorry, Could not fetch weather data, check the city spelling and try again.");
            }
        }
        else{
            displayError("Please enter a city");
        }

    })

    async function apiFetch() {
        try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data); // testing only
            displayWeather(data); 
        } else {
            throw Error(await response.text());
        }
        } catch (error) {
            console.log(error);
        }
    }
    async function forecastFetch() {
        try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const forecastData = await response.json();
            // console.log(data); // testing only
            displayForecast(forecastData); 
        } else {
            throw Error(await response.text());
        }
        } catch (error) {
            console.log(error);
        }
    }
    
    forecastFetch();
    apiFetch();

    function displayWeather(data) {
        const currentTemp = document.querySelector(".tempDisplay");
        const weatherIcon = document.querySelector(".weatherEmoji");
        const captionDesc = document.querySelector(".descDisplay");

        currentTemp.innerHTML = `${data.main.temp}&deg;F`;
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        captionDesc.textContent = `${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
    }

    function displayForecast(data) {
        if (!data.list) {
            console.error("Forecast data does not have a 'list' property");
            return;
        }
        forecastContainer.innerHTML = ""; // Clear existing forecast

        // Filter data to get the forecast for the next 3 days (every 24 hours)
        const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);

        forecast.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayItem = document.createElement('div');
            dayItem.classList.add('forecast-item');

            const icon = document.createElement('img');
            icon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            icon.alt = day.weather[0].description;

            const options = { weekday: 'short' };
            const dayString = date.toLocaleDateString('en-US', options);
            const tempFahrenheit = ((day.main.temp - 273.15) * (9/5) + 32).toFixed(1);
            const temp = document.createElement('span');
            temp.textContent = `${dayString}: ${tempFahrenheit}°F`;

            dayItem.appendChild(icon);
            dayItem.appendChild(temp);

            forecastContainer.appendChild(dayItem);
        });
    }
    
    
    async function getWeatherData(city){

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(apiUrl);

        // console.log(response);

        if(!response.ok){
            throw new Error("Could not fetch weather data");
        }

        return await response.json();

    }
    
    async function forecastCityFetch(city) {
        try {
            const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
            const forecastResponse = await fetch(forecastApiUrl);
    
            if (forecastResponse.ok) {
                const forecastDataCity = await forecastResponse.json();
                console.log("Forecast Data:", forecastDataCity); // Log the data for debugging
                return forecastDataCity;
            } else {
                throw new Error("Failed to fetch forecast data");
            }
        } catch (error) {
            console.error("Error fetching forecast data:", error);
            throw error;
        }
    }
    

    function displayWeatherInfo(data){

        const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

        card.innerHTML = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
        // tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
    }
    

    function getWeatherEmoji(weatherId){

        switch(true){
            case (weatherId >= 200 && weatherId < 300):
                return "⛈";
            case (weatherId >= 300 && weatherId < 400):
                return "🌧";
            case (weatherId >= 400 && weatherId < 500):
                return "🌧";
            case (weatherId >= 500 && weatherId < 600):
                return "❄";
            case (weatherId >= 600 && weatherId < 700):
                return "🌫";
            case (weatherId >= 700 && weatherId < 800):
                return "🌞";
            case (weatherId >= 800 && weatherId < 810):
                return "⛅";
            default:
                return "❓";
        }

    }
    
    
    function displayError(message){

        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("errorDisplay");

        card.textContent = "";
        card.style.display = "flex";
        card.appendChild(errorDisplay)

    }
    
});