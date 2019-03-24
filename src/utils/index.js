const getTime = date => date.split(' ')[1];
const getHour = date => +getTime(date).split(':')[0]; 

export const getForecastAtNoon = data => {
  const { list: forecasts } = data.data;
  return forecasts.filter(forecast => getHour(forecast.dt_txt) === 12);
}

export const toCelsius = t => Math.floor(t - 273.15);
export const toFahrenheit = t => toCelsius(t) * 9/5 + 32;
