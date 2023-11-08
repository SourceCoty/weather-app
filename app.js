let forecast = ""
let current = ""
let dayOne = ""
let dayTwo = ""
let dayThree = ""
// let dayOneDisplay ="";
// let dayTwoDisplay = "";
// let dayThreeDisplay = "";

getForecast("chiang mai")

async function getForecast(location) {
    try {
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=08d3021134324946aa4131033230811&q=" + location + "&days=3&aqi=no&alerts=no", {mode: 'cors'})
        const forecastData = await response.json()
        
        forecast = await forecastData;
        current = await forecast.current;
        dayOne = await forecast.forecast.forecastday[0]
        dayTwo = await forecast.forecast.forecastday[1]
        dayThree = await forecast.forecast.forecastday[2]

        getCurrentWeather(current)
        getDayOne(dayOne)
        getDayTwo(dayTwo)
        getDayThree(dayThree)


    } catch(error) {
        console.log("Error:", error)
    }
}

function getCurrentWeather(current) {
    const temp = current.temp_c
    const precip = current.precip_mm
    const humidity = current.humidity
    const wind = current.wind_kph

    setCurrentWeatherDisplay(temp, precip, humidity, wind)
}

function setCurrentWeatherDisplay(temp, precip, humidity, wind) {
    const tempDisplay = document.getElementById('current-temp')
    const precipDisplay = document.getElementById('current-precip')
    const humidityDisplay = document.getElementById('current-humidity')
    const windDisplay = document.getElementById('current-wind')

    tempDisplay.innerHTML = `${temp}°`
    precipDisplay.innerHTML = `${precip}mm`
    humidityDisplay.innerHTML = `${humidity}%`
    windDisplay.innerHTML = `${wind}km/h`
}

function getDayOne(dayOne) {
    const dayOneIcon = dayOne.day.condition.icon
    const dayOneMaxTemp = dayOne.day.maxtemp_c 
    const dayOneMinTemp = dayOne.day.mintemp_c 

    setDayOneDisplay(dayOneIcon, dayOneMaxTemp, dayOneMinTemp)
}

function setDayOneDisplay(dayOneIcon, dayOneMaxTemp, dayOneMinTemp) {
    // const iconDisplay = document.getElementById('day-one-icon')
    const maxTempDisplay = document.getElementById('day-one-max')
    const minTempDisplay = document.getElementById('day-one-min')


    // iconDisplay.setAttribute('src', `${dayOneIcon}`)
    maxTempDisplay.innerHTML = dayOneMaxTemp + '°'
    minTempDisplay.innerHTML = dayOneMinTemp + '°'
}

function getDayTwo(dayTwo) {
    const dayTwoIcon = dayTwo.day.condition.icon
    const dayTwoMaxTemp = dayTwo.day.maxtemp_c
    const dayTwoMinTemp = dayTwo.day.mintemp_c

    setDayTwoDisplay(dayTwoIcon, dayTwoMaxTemp, dayTwoMinTemp)
}

function setDayTwoDisplay(dayTwoIcon, dayTwoMaxTemp, dayTwoMinTemp) {
    // const iconDisplay = document.getElementById('day-one-icon')
    const maxTempDisplay = document.getElementById('day-two-max')
    const minTempDisplay = document.getElementById('day-two-min')


    // iconDisplay.setAttribute('src', `${dayOneIcon}`)
    maxTempDisplay.innerHTML = dayTwoMaxTemp + '°'
    minTempDisplay.innerHTML = dayTwoMinTemp + '°'
}

function getDayThree(dayThree) {
    const dayThreeIcon = dayThree.day.condition.icon
    const dayThreeMaxTemp = dayThree.day.maxtemp_c
    const dayThreeMinTemp = dayThree.day.mintemp_c

    setDayThreeDisplay(dayThreeIcon, dayThreeMaxTemp, dayThreeMinTemp)
}

function setDayThreeDisplay(dayThreeIcon, dayThreeMaxTemp, dayThreeMinTemp) {
    // const iconDisplay = document.getElementById('day-one-icon')
    const maxTempDisplay = document.getElementById('day-three-max')
    const minTempDisplay = document.getElementById('day-three-min')


    // iconDisplay.setAttribute('src', `${dayOneIcon}`)
    maxTempDisplay.innerHTML = dayThreeMaxTemp + '°'
    minTempDisplay.innerHTML = dayThreeMinTemp + '°'
}

