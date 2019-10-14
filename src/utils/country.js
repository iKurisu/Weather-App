import countryCodes from "./country-codes.json";

export const getCountry = code => {
  return countryCodes.find(country => country.Code === code).Name;
};
