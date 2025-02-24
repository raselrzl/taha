/* import countries from "world-countries";

const countriesFormatted = countries.map((item) => ({
  value: item.cca2,
  label: item.name.common,
  flag: item.flag,
  latLang: item.latlng,
  region: item.region,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted;

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value);
  };

  return {
    getAllCountries,
    getCountryByValue,
  };
};
 */


import countries from "world-countries";

const citiesInSpain: {
  value: string;
  label: string;
  latLang: [number, number]; // Explicitly typed as a tuple
  region: string;
}[] = [
  { value: "MAD", label: "Madrid", latLang: [40.4168, -3.7038], region: "Madrid" },
  { value: "BCN", label: "Barcelona", latLang: [41.3784, 2.1925], region: "Catalonia" },
  { value: "VAL", label: "Valencia", latLang: [39.4699, -0.3763], region: "Valencia" },
  { value: "SEV", label: "Seville", latLang: [37.3886, -5.9823], region: "Andalusia" },
  { value: "MAL", label: "Malaga", latLang: [36.7213, -4.4216], region: "Andalusia" }
];

const citiesFormatted = citiesInSpain.map((item) => ({
  value: item.value,
  label: item.label,
  latLang: item.latLang as [number, number], // Ensure type safety
  region: item.region,
}));

export const useCountries = () => {
  const getAllCountries = () => citiesFormatted;

  const getCountryByValue = (value: string) => {
    return citiesFormatted.find((item) => item.value === value) || null;
  };

  return {
    getAllCountries,
    getCountryByValue,
  };
};
