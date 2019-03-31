const getTime = date => date.split(' ')[1];
const getHour = date => +getTime(date).split(':')[0]; 

export const getForecastAtNoon = data => {
  const { list: forecasts } = data;
  return forecasts.filter(forecast => getHour(forecast.dt_txt) === 12);
}

export const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];