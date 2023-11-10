const searchBar = document.getElementById("search-container")
const tempToggle = document.getElementById("temp-toggle")
let forecast = ""
let current = ""
let dayOne = ""
let dayTwo = ""
let dayThree = ""
let tempScale = "celcius"
let currentLocation = "Villard, MN" //placeholder value for default load

getForecast("Villard, MN")

searchBar.addEventListener("submit", (e) => {
    e.preventDefault()
    
    let location = document.getElementById("search-bar").value

    getForecast(location)
})


tempToggle.addEventListener("click", () => {
    if (tempScale ==="celcius") {
        tempScale = "fahrenheit"
        tempToggle.innerHTML = "F°"
    } else if (tempScale === "fahrenheit") {
        tempScale = "celcius"
        tempToggle.innerHTML = "C°"
    }

    getForecast(currentLocation)
})


async function getForecast(location) {
    try {
        const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=08d3021134324946aa4131033230811&q=" + location + "&days=3&aqi=no&alerts=no", {mode: 'cors'})
        const forecastData = await response.json()
        
        forecast = await forecastData;
        current = await forecast.current;
        dayOne = await forecast.forecast.forecastday[0]
        dayTwo = await forecast.forecast.forecastday[1]
        dayThree = await forecast.forecast.forecastday[2]

        getCurrentLocation(forecast)
        getLocationData(forecast)
        getCurrentWeatherData(current)
        getDayOneData(dayOne)
        getDayTwoData(dayTwo)
        getDayThreeData(dayThree)


    } catch(error) {
        console.log("Error:", error)
    }
}

function getCurrentLocation(forecast) {
    currentLocation = `${forecast.location.name}, ${forecast.location.region}, ${forecast.location.country}`
}

function getLocationData(forecast) {
    const country = forecast.location.country
    const region = forecast.location.region
    const city = forecast.location.name

    renderLocationDisplay(country, region, city)
}

function renderLocationDisplay(country, region, city) {
    const locationDisplay = document.getElementById("location")
    
    console.log (country)

    if (country === "USA United States of America" || country === "United States of America" || country === "USA") {
        locationDisplay.innerHTML = city + ", " + region
    } else {
        locationDisplay.innerHTML = city + ", " + country
    }
}

function getCurrentWeatherData(current) {
    const tempC = Math.round(current.temp_c) + "°"
    const tempF = Math.round(current.temp_f) + "°"
    const precipI = current.precip_in + `"`
    const precipM = current.precip_in + `mm`
    const humidity = current.humidity + "%"
    const windK = Math.round(current.wind_kph) + "k/h"
    const windM = Math.round(current.wind_mph) + "m/h"

    if(tempScale === "celcius") {
        renderCurrentWeatherDisplay(tempC, precipM, humidity, windK)
    } else if (tempScale === "fahrenheit") {
        renderCurrentWeatherDisplay(tempF, precipI, humidity, windM)
    }
    
}

function renderCurrentWeatherDisplay(temp, precip, humidity, wind) {
    const tempDisplay = document.getElementById('current-temp')
    const precipDisplay = document.getElementById('current-precip')
    const humidityDisplay = document.getElementById('current-humidity')
    const windDisplay = document.getElementById('current-wind')

    tempDisplay.innerHTML = temp
    precipDisplay.innerHTML = precip
    humidityDisplay.innerHTML = humidity
    windDisplay.innerHTML = wind
}

function getDayOneData(dayOne) {
    const maxTempC = Math.round(dayOne.day.maxtemp_c)
    const maxTempF = Math.round(dayOne.day.maxtemp_f)

    const minTempC = Math.round(dayOne.day.mintemp_c)
    const minTempF = Math.round(dayOne.day.mintemp_f)

    if (tempScale === "celcius") {
        renderDayOneDisplay(maxTempC, minTempC)
    } else if (tempScale === "fahrenheit") {
        renderDayOneDisplay(maxTempF, minTempF)
    }

    renderIconDisplay(dayOne, "day-one-icon")
}

function renderDayOneDisplay(maxTemp, minTemp) {
    const maxDisplay = document.getElementById('day-one-max')
    const minDisplay = document.getElementById('day-one-min')

    maxDisplay.innerHTML = maxTemp + '°'
    minDisplay.innerHTML = minTemp + '°'
}

function getDayTwoData(dayTwo) {
    const maxTempC = Math.round(dayTwo.day.maxtemp_c)
    const maxTempF = Math.round(dayTwo.day.maxtemp_f)

    const minTempC = Math.round(dayTwo.day.mintemp_c)
    const minTempF = Math.round(dayTwo.day.mintemp_f)

    if (tempScale === "celcius") {
        renderDayTwoDisplay(maxTempC, minTempC)
    } else if (tempScale === "fahrenheit") {
        renderDayTwoDisplay(maxTempF, minTempF)
    }

    renderIconDisplay(dayTwo, "day-two-icon")
}

function renderDayTwoDisplay(maxTemp, minTemp) {
    const maxDisplay = document.getElementById('day-two-max')
    const minDisplay = document.getElementById('day-two-min')

    maxDisplay.innerHTML = maxTemp + '°'
    minDisplay.innerHTML = minTemp + '°'
}

function getDayThreeData(dayThree) {
    const maxTempC = Math.round(dayThree.day.maxtemp_c)
    const maxTempF = Math.round(dayThree.day.maxtemp_f)
    
    const minTempC = Math.round(dayThree.day.mintemp_c)
    const minTempF = Math.round(dayThree.day.mintemp_f)

    if (tempScale === "celcius") {
        renderDayThreeDisplay(maxTempC, minTempC)
    } else if (tempScale === "fahrenheit") {
        renderDayThreeDisplay(maxTempF, minTempF)
    }

    renderIconDisplay(dayThree, "day-three-icon")
}

function renderDayThreeDisplay(maxTemp, minTemp) {
    const maxDisplay = document.getElementById('day-three-max')
    const minDisplay = document.getElementById('day-three-min')

    maxDisplay.innerHTML = maxTemp + '°'
    minDisplay.innerHTML = minTemp + '°'
}

function renderIconDisplay(forecast, elementId) {
    let code = forecast.day.condition.code
    
    if (code === 1000) {
        retrieveSunnySVG(elementId)
    } else if (code === 1003) {
        retrievePartlyCloudySVG(elementId)
    } else if (
        code === 1006 ||
        code === 1009 ||
        code === 1135 ||
        code === 1147) {
        retrieveCloudySVG(elementId)
    } else if (
        code === 1030 ||
        code === 1063 ||
        code === 1072 ||
        code === 1150 ||
        code === 1153 ||
        code === 1168 ||
        code === 1171 ||
        code === 1180 ||
        code === 1183 ||
        code === 1186 ||
        code === 1189 ||
        code === 1192 ||
        code === 1195 ||
        code === 1198 ||
        code === 1201 ||
        code === 1240 ||
        code === 1243 ||
        code === 1246) {
        retrieveRainySVG(elementId)
    } else if (
        code === 1066 ||
        code === 1114 ||
        code === 1117 ||
        code === 1204 ||
        code === 1207 ||
        code === 1210 ||
        code === 1213 ||
        code === 1216 ||
        code === 1219 ||
        code === 1222 ||
        code === 1225 ||
        code === 1237 ||
        code === 1249 ||
        code === 1252 ||
        code === 1255 ||
        code === 1258 ||
        code === 1261 ||
        code === 1264) {
            retrieveSnowySVG(elementId)
    } else if(
        code === 1087 ||
        code === 1273 ||
        code === 1276 ||
        code === 1279 ||
        code === 1282) {
            retrieveStormySVG(elementId)
    } else {
        console.log("Error:", code, " not assigned to an icon")
    }
}

function retrieveSunnySVG(elementId) {
    const icon = document.getElementById(elementId);

    icon.src = "sunny.svg"
}

function retrievePartlyCloudySVG(elementId) {
    const icon = document.getElementById(elementId);

    icon.src = "partly-cloudy.svg"
}

function retrieveCloudySVG(elementId) {
    const icon = document.getElementById(elementId);

    icon.src = "cloudy.svg"
}

function retrieveRainySVG(elementId) {
    const icon = document.getElementById(elementId);

    icon.src = "rainy.svg"
}

function retrieveSnowySVG(elementId) {
    const icon = document.getElementById(elementId);

    icon.src = "snowy.svg"
}

function retrieveStormySVG(elementId) {
    const icon = document.getElementById(elementId);

    icon.src = "stormy.svg"
}
