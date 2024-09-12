const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "c3007fe32c30aa9ad33123d4d4bfdfc3";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city_name = cityInput.value.trim(); // Удаляем лишние пробелы

    if (city_name) {
        try {
            const weatherData = await getWeatherData(city_name);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city!");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`Couldn't fetch weather data`);
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = '';
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `Description: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("weatherEmoji")
    

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch(true){
        case(weatherId >=200 && weatherId < 300):
            return '⛈️';
        case(weatherId >=300 && weatherId < 500):
            return '🌧️';
        case(weatherId >=500 && weatherId < 600):
            return '🌧️';
        case(weatherId >=600 && weatherId < 700):
            return '❄️';
        case(weatherId >=700 && weatherId < 800):
            return '🌫️';
        case(weatherId ===800 ):
            return '☀️';
        case(weatherId >=801 && weatherId < 810):
            return '☁️';
        default:
            return '❓';
    }
}

function displayError(message) {
    const existingError = document.querySelector('.errorDisplay');
    if (existingError) {
        existingError.remove();
    }

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = "";
    card.style.display = 'flex';
    card.appendChild(errorDisplay);

    setTimeout(() => {
        errorDisplay.style.opacity = 0;
        setTimeout(() => {
            if (errorDisplay.parentNode) {
                card.removeChild(errorDisplay);
            }
        }, 500);
    }, 5000);
}