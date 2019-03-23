const getTime = date => date.split(' ')[1];
const getHour = date => +getTime(date).split(':')[0]; 

export const getWeatherAtNoon = data => {
  const { list: forecasts } = data.data;
  return forecasts.filter(forecast => getHour(forecast.dt_txt) === 12);
}