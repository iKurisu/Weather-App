import * as convert from "./temperature";

const getTime = date => date.split(" ")[1];
const getHour = date => +getTime(date).split(":")[0];

export const getForecastAtNoon = data => {
  const { list: forecasts } = data;
  return forecasts.filter(forecast => getHour(forecast.dt_txt) === 12);
};

export const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const forecastFormat = unit => forecast => ({
  day: forecast.dt_txt || "NOW",
  weather: forecast.weather[0].main,
  temperature: convert[`to${unit}`](forecast.main.temp_max),
  id: forecast.dt
});

export const nextThreeDays = forecast => {
  const day = new Date(forecast.dt_txt).getDay();
  const today = new Date().getDay();
  const possibleDiffs = [1, 2, 3, 4, -3, -4, -5, -6];

  return possibleDiffs.includes(day - today);
};
