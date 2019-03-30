export const toCelsius = t => Math.round(t - 273.15);
export const toFahrenheit = t => toCelsius(t) * 9 / 5 + 32;