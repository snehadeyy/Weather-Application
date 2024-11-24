let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_datetime");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather-min");
let w_maxTem = document.querySelector(".weather-max");

let w_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
};

const getDateTime = (dateTime) => {
    const curDate = new Date(dateTime * 1000); // Convert seconds to milliseconds
    console.log(curDate);
    // // const date = new Date();
    const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    //   second: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    // console.log(formatter);
    return formatter.format(curDate);
};

let city = "kolkata";

citySearch.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
  
    getWeatherData();
  
    cityName.value = "";
  });

const getWeatherData = async ()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=44.34&lon=10.99&appid=112db3e88627d4cb4e92e0e6ae2cca55`;
    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const {main,name,weather,wind,sys,dt} = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        
        w_forecast.innerHTML = `${weather[0].main}`;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;


        w_temperature.innerHTML = `${main.temp}&#176 F`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176 F`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176 F`;

        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176 F`;
        w_humidity.innerHTML = `${main.humidity.toFixed()}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;

    }catch(err){
        console.log(err);
    }
};
document.body.addEventListener("load",getWeatherData());