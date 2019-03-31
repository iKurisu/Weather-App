export const toCelsius = t => Math.round(t - 273.15);
export const toFahrenheit = t => Math.round(toCelsius(t) * 9 / 5) + 32;