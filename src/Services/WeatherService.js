import { DateTime } from "luxon";

const API_KEY = "1a50534d32a320b910036b4555c1f28f";
const BASE_URL = "https://api.openweathermap.org/data/3.0/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    weather,
    speed,
  };
};

const formatforecastweather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formattolocaltime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formattolocaltime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "https://api.openweathermap.org/data/2.5/weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;
  const formattedforecastWeather = await getWeatherData(
    "https://api.openweathermap.org/data/3.0/onecall",
    {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    }
  ).then(formatforecastweather);

  return { ...formattedCurrentWeather, ...formattedforecastWeather };
};

const formattolocaltime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconurlfromcode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formattolocaltime, iconurlfromcode };
