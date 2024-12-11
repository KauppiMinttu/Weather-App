const apiKey = "9329f6f369bda2b0826df0b0ef374bca";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
try{
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error("City not found");
    }
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/cloud.png";
    }

    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/summer.png";
    }

    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    }

    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/lighting.png";
    }

    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/partycloud.png";
    }

    document.querySelector(".weather").style.display = "block";


} catch (error) {
    alert("City not found. Please try again.");
}
}



// Event listener for the search button click
searchBtn.addEventListener("click", ()=>{
checkWeather(searchBox.value);
});

// Event listener for the "Enter" key press on the input field
searchBox.addEventListener("keypress", (event) => {
if (event.key === "Enter") {
    checkWeather(searchBox.value)
}
})