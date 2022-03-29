

const key = "0bb580fa8ebe42158b8131727210311"


const addCiti = document.getElementById("add-city")
const moduleSearch = document.querySelector(".module__form")
const moduleSearch2 = document.getElementsByClassName("module__form")

const getCiti = document.querySelector('.find-city');
const search = document.querySelector("#search")


const changeIcon =(text)=>{
    if(text.includes("partly cloudy"))return "partly-cloudy-day"
    if(text.includes("rain"))return "rain"
    if(text.includes("snow"))return "snow"
    if(text.includes("clear"))return "clear-day"
    return 'clear-day';
}

const noPolish = (letter) => {
    switch(letter){
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
    }
}


addCiti.addEventListener("click", event=>{
    event.preventDefault()
    moduleSearch.removeAttribute("hidden")
})
moduleSearch.querySelector(".btn--close").addEventListener("click", ev => {
    ev.preventDefault()
    moduleSearch.hidden = true
})



const searchForm = document.querySelector(".find-city")



const wheterModule = document.getElementsByClassName("module module__weather")[0]

clonedWheterModule = wheterModule.cloneNode(true)

const clonedWeatherForecast = clonedWheterModule.getElementsByClassName("weather__forecast")[0]
WatherChildren = clonedWeatherForecast.children
clonedWeatherForecast.removeChild(WatherChildren[4])
clonedWeatherForecast.removeChild(WatherChildren[3])


 const weatherForecast = document.getElementsByClassName("weather__forecast")


const WetherFunction = async (location="auto:ip") =>{
    const firstresponse = await 
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3`, {mode: 'cors'});
    const firstCiti = await firstresponse.json()
    const { location: {name}, current:{temp_c, pressure_mb, humidity, wind_mph},} = firstCiti
    const forecastday =  firstCiti.forecast.forecastday
    
    
    let weatherIcon = clonedWheterModule.children[1].children[0].lastElementChild
    weatherIcon.src = `assets/icons/${changeIcon(firstCiti.current.condition.text.toLowerCase())}.svg`
    const weatherInfo1 = clonedWheterModule.children[1].children[1]

    weatherInfo1.firstElementChild.innerText = name
    weatherInfo1.lastElementChild.innerHTML = `${temp_c}&deg;C`
    const clonedWeatherForecast = clonedWheterModule.getElementsByClassName("weather__forecast")[0]
    const clonedWetehrDetails = clonedWheterModule.getElementsByClassName("weather__details")[0]

    clonedWetehrDetails.children[0].children[1].innerText =  `${pressure_mb} hPa`
    clonedWetehrDetails.children[1].children[1].innerText =  `${humidity} %`
    clonedWetehrDetails.children[2].children[1].innerText =  `${wind_mph} m/s`



    clonedWeatherForecast.children[0].lastElementChild.innerHTML = `${forecastday[0].day.avgtemp_c}&deg;C`
    clonedWeatherForecast.children[0].firstElementChild.innerHTML = `${forecastday[0].date}`
    clonedWeatherForecast.children[0].children[1].src = `assets/icons/${changeIcon(forecastday[0].day.condition.text.toLowerCase())}.svg`


    clonedWeatherForecast.children[1].lastElementChild.innerHTML = `${forecastday[1].day.avgtemp_c}&deg;C`
    clonedWeatherForecast.children[1].firstElementChild.innerHTML = forecastday[1].date
    clonedWeatherForecast.children[1].children[1].src = `assets/icons/${changeIcon(forecastday[1].day.condition.text.toLowerCase())}.svg`

    clonedWeatherForecast.children[2].lastElementChild.innerHTML = `${forecastday[2].day.avgtemp_c}&deg;C`
    clonedWeatherForecast.children[2].firstElementChild.innerHTML = forecastday[2].date
    clonedWeatherForecast.children[2].children[1].src = `assets/icons/${changeIcon(forecastday[2].day.condition.text.toLowerCase())}.svg`
    
    wheterModule.parentElement.appendChild(clonedWheterModule)
    clonedWheterModule.removeAttribute("hidden")
}



WetherFunction()

const closeBTN = clonedWheterModule.getElementsByClassName("btn btn--icon btn--close")[0]

closeBTN.addEventListener("click", ev => {
    ev.preventDefault()
    closeBTN.parentElement.remove()

})

const closeBTN2 = clonedWheterModule.querySelector(".btn--close")



getCiti.addEventListener("submit",(event)=>{
    event.preventDefault();
    // if (getCiti.value ===''){
    //     getCiti='auto:ip'
    // }
    // else{
    //     const search = document.querySelector("#search")
    //     WetherFunction(search.value)
    // }
    
    const search = document.querySelector("#search")
    let cleansearchValue = ''
    for(let letter in search.value){
        cleansearchValue += noPolish(search.value[letter]);
        
    }
    WetherFunction(cleansearchValue)
})
