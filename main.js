const cityInput = document.getElementById("search-input");
const subBtn = document.getElementById("search-button");
const currentCity = document.getElementById("city-text");
const tempValue = document.getElementById("temp-value");

let oldCityName = "City Name"                              // Initial Name of the city to be input.
let oldTemp = `${Math.trunc(Math.random() * 50)}&deg;C`    // Comment this line if you have API key, Host and API URL.

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'Your Key',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

let onLod = true;
if (true) {
    currentCity.textContent = "Loading....";
    weatherData(oldCityName);
    onLod = false;
}

async function weatherData(cityName) {
    const response = await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`, options);
    const responseJson = await response.json();
    tempUpdate(cityName, responseJson)
}

function tempUpdate(nameCity, response) {
    if (response.temp === undefined) {
        tempValue.innerHTML = oldTemp;
        currentCity.textContent = "Incorrect City Name.";
        setTimeout(() => {
            currentCity.textContent = oldCityName;
            cityInput.value = "";
        }, 2000);
    }
    else {
        currentCity.textContent = nameCity[0].toUpperCase() + nameCity.slice(1);
        tempValue.innerHTML = `${response.temp}&deg;C`;
        oldTemp = tempValue.innerHTML;
        cityInput.value = "";
    }
}

subBtn.addEventListener("click",
    () => {
        currentCity.textContent = "Loading....";
        weatherData(cityInput.value)
    }
)
