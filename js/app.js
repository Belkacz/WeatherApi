

const key = "0bb580fa8ebe42158b8131727210311";


const addCiti = document.getElementById("add-city");
const moduleSearch = document.querySelector(".module__form");
const moduleSearch2 = document.getElementsByClassName("module__form");

const getCiti = document.querySelector('.find-city');
const search = document.querySelector("#search");


const changeIcon = (text) => {
    if (text.includes("partly cloudy")) return "partly-cloudy-day"
    if (text.includes("rain")) return "rain";
    if (text.includes("snow")) return "snow";
    if (text.includes("clear")) return "clear-day";
    return 'clear-day';
};

const noPolish = (letter) => {
    switch (letter) {
        case 'ą': return 'a';
        case 'ć': return 'c';
        case 'ę': return 'e';
        case 'ł': return 'l';
        case 'ń': return 'n';
        case 'ś': return 's';
        case 'ó': return 'o';
        case 'ź': return 'z';
        case 'ż': return 'z';
        default: return letter;
    };
};


addCiti.addEventListener("click", event => {
    event.preventDefault();
    moduleSearch.removeAttribute("hidden");
})
moduleSearch.querySelector(".btn--close").addEventListener("click", ev => {
    ev.preventDefault();
    moduleSearch.hidden = true;
})

const searchForm = document.querySelector(".find-city");

const weatherModule = document.getElementsByClassName("module module__weather")[0];
clonedWeatherModule = weatherModule.cloneNode(true);
const clonedWeatherForecast = clonedWeatherModule.getElementsByClassName("weather__forecast")[0];
weatherChildren = clonedWeatherForecast.children;
clonedWeatherForecast.removeChild(weatherChildren[4]);
clonedWeatherForecast.removeChild(weatherChildren[3]);


const weatherForecast = document.getElementsByClassName("weather__forecast")


const WetherFunction = async (location = "auto:ip") => {
    const firstResponse = await
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3`, { mode: 'cors' });
    const firstCiti = await firstResponse.json()
    const { location: { name }, current: { temp_c, pressure_mb, humidity, wind_mph }, } = firstCiti
    const forecastDay = firstCiti.forecast.forecastday;

    const newClonedWeatherModule = weatherModule.cloneNode(true);

    let weatherIcon = newClonedWeatherModule.children[1].children[0].lastElementChild;
    weatherIcon.src = `assets/icons/${changeIcon(firstCiti.current.condition.text.toLowerCase())}.svg`;
    const weatherInfo1 = newClonedWeatherModule.children[1].children[1];

    weatherInfo1.firstElementChild.innerText = name;
    weatherInfo1.lastElementChild.innerHTML = `${temp_c}&deg;C`;
    const clonedWeatherForecast = newClonedWeatherModule.getElementsByClassName("weather__forecast")[0];
    const clonedWeatherDetails = newClonedWeatherModule.getElementsByClassName("weather__details")[0];

    clonedWeatherDetails.children[0].children[1].innerText = `${pressure_mb} hPa`;
    clonedWeatherDetails.children[1].children[1].innerText = `${humidity} %`;
    clonedWeatherDetails.children[2].children[1].innerText = `${wind_mph} m/s`;

    clonedWeatherForecast.children[0].lastElementChild.innerHTML = `${forecastDay[0].day.avgtemp_c}&deg;C`;
    clonedWeatherForecast.children[0].firstElementChild.innerHTML = `${forecastDay[0].date}`;
    clonedWeatherForecast.children[0].children[1].src = `assets/icons/${changeIcon(forecastDay[0].day.condition.text.toLowerCase())}.svg`;


    clonedWeatherForecast.children[1].lastElementChild.innerHTML = `${forecastDay[1].day.avgtemp_c}&deg;C`;
    clonedWeatherForecast.children[1].firstElementChild.innerHTML = forecastDay[1].date;
    clonedWeatherForecast.children[1].children[1].src = `assets/icons/${changeIcon(forecastDay[1].day.condition.text.toLowerCase())}.svg`;

    clonedWeatherForecast.children[2].lastElementChild.innerHTML = `${forecastDay[2].day.avgtemp_c}&deg;C`;
    clonedWeatherForecast.children[2].firstElementChild.innerHTML = forecastDay[2].date;
    clonedWeatherForecast.children[2].children[1].src = `assets/icons/${changeIcon(forecastDay[2].day.condition.text.toLowerCase())}.svg`;

    if(weatherModule.parentElement.children.length > 3) {
        weatherModule.parentElement.insertBefore(newClonedWeatherModule, weatherModule.parentElement.children[3]);
    } else {
        weatherModule.parentElement.appendChild(newClonedWeatherModule);
    }

    newClonedWeatherModule.removeAttribute("hidden");
    const closeBTN = newClonedWeatherModule.getElementsByClassName("btn btn--icon btn--close")[0];
    closeBTN.addEventListener("click", ev => {
        ev.preventDefault();
        newClonedWeatherModule.remove();
    });
}

getCiti.addEventListener("submit", (event) => {
    event.preventDefault();

    const search = document.querySelector("#search");
    let cleanSearchValue = '';
    search.value.toLowerCase();
    for (let letterIndex in search.value) {
        cleanSearchValue += noPolish(search.value[letterIndex].toLowerCase());
    }
    console.log(cleanSearchValue)
    WetherFunction(cleanSearchValue);
})

WetherFunction()
