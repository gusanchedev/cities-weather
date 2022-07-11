const ACCUWEATHER_API_KEY = "STS8XKAVsQmUA0sfiVWiGsxFSpw3wble";
const ACCUWEATHER_CITY_SEARCH_API = `https://dataservice.accuweather.com/locations/v1/cities/search`;
const ACCUWEATHER_CURRENT_CONDITIONS_API = `https://dataservice.accuweather.com/currentconditions/v1/`;
const ACCUWEATHER_FORECAST_API = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
const ACCUWEATHER_ICONS_URL = `https://developer.accuweather.com/sites/default/files/`;

async function getCityInformation(city) {
  const citySearchUrl = `${ACCUWEATHER_CITY_SEARCH_API}?apikey=${ACCUWEATHER_API_KEY}&q=${city}`;
  const res = await fetch(citySearchUrl);
  const cityInformation = await res.json();
  return cityInformation;
}
async function getCurrentConditions(locationKey) {
  const currentConditionsUrl = `${ACCUWEATHER_CURRENT_CONDITIONS_API}/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true`;
  const res = await fetch(currentConditionsUrl);
  const currentConditions = await res.json();
  return currentConditions;
}
async function getForecast(locationKey) {
  const forecastUrl = `${ACCUWEATHER_FORECAST_API}/${locationKey}?apikey=${ACCUWEATHER_API_KEY}`;
  const res = await fetch(forecastUrl);
  const forecast = await res.json();
  return forecast;
}

function clearCitiesContainer() {
  const container = document.getElementById("cities-container");
  if (container) {
    container.remove();
  }
  return;
}
function clearCurrentWeatherContainer() {
  const container = document.getElementById("current-weather-card");
  console.log(container);
  if (container) {
    container.remove();
  }
  return;
}

function createCitiesGrid(cities, resultsSection) {
  const citiesContainer = document.createElement("div");
  citiesContainer.classList.add("cities-container");
  citiesContainer.id = "cities-container";
  cities.forEach((city) => {
    const cityCard = document.createElement("div");
    cityCard.classList.add("city-card");
    cityCard.dataset.locationKey = city.Key;
    const cityMap = document.createElement("span");
    cityMap.classList.add("city-map");
    switch (city.Region.ID) {
      case "SAM":
      case "NAM":
      case "CAC":
        cityMap.innerHTML = `<i class="fa-solid fa-earth-americas"></i>`;
        break;
      case "AFR":
        cityMap.innerHTML = `<i class="fa-solid fa-earth-africa"></i>`;
        break;
      case "ANT":
        cityMap.innerHTML = `<i class="fa-solid fa-igloo"></i>`;
        break;
      case "ARC":
        cityMap.innerHTML = `<i class="fa-solid fa-igloo"></i>`;
        break;
      case "ASI":
        cityMap.innerHTML = `<i class="fa-solid fa-earth-asia"></i>`;
        break;
      case "EUR":
        cityMap.innerHTML = `<i class="fa-solid fa-earth-europe"></i>`;
        break;
      case "MEA":
        cityMap.innerHTML = `<i class="fa-solid fa-earth-africa"></i>`;
        break;
      case "OCN":
        cityMap.innerHTML = `<i class="fa-solid fa-earth-oceania"></i>`;
        break;
    }
    cityCard.append(cityMap);
    const cityName = document.createElement("span");
    cityName.classList.add("city-name");
    cityName.innerHTML = `${city.LocalizedName}, ${city.AdministrativeArea.ID}, ${city.Country.LocalizedName}`;
    cityCard.append(cityName);
    const cityData = document.createElement("div");
    cityData.classList.add("city-data");
    const elevationText = document.createElement("p");
    elevationText.innerHTML = `Elevation: ${city.GeoPosition.Elevation.Metric.Value} ${city.GeoPosition.Elevation.Metric.Unit}`;
    const latitudeText = document.createElement("p");
    latitudeText.innerHTML = `Latitude: ${city.GeoPosition.Latitude}°`;
    const longitudeText = document.createElement("p");
    longitudeText.innerHTML = `Longitude: ${city.GeoPosition.Longitude}°`;
    cityData.append(elevationText, latitudeText, longitudeText);
    cityCard.append(cityData);
    cityCard.addEventListener("click", async () => {
      const locationKey = cityCard.dataset.locationKey;
      const currentConditions = await getCurrentConditions(locationKey);
      createCurrentWeatherCard(currentConditions, city.LocalizedName);
    });
    citiesContainer.append(cityCard);
  });
  console.log(resultsSection);
  console.log(cities);
  resultsSection.append(citiesContainer);
}

function createCurrentWeatherCard(currentConditions, city) {
  const currentWeatherContainer = document.getElementById(
    "current-weather-container"
  );
  const localDateTime = new Date(currentConditions[0].LocalObservationDateTime);
  if (currentConditions[0].WeatherIcon < 10) {
    currentConditions[0].WeatherIcon = "0" + currentConditions[0].WeatherIcon;
  }
  const currentWeatherCard = document.createElement("div");
  currentWeatherCard.innerHTML = `<div class="current-weather-card" id="current-weather-card">
                                    <div class="current-weather-header">
                                      <div class="city-weather-container">
                                        <div class="temperature-container">
                                          <p>${
                                            currentConditions[0].Temperature
                                              .Metric.Value
                                          }° ${
    currentConditions[0].Temperature.Metric.Unit
  }</p>
                                        </div>
                                        <div class="city-data-container">
                                          <p>${city}</p>
                                          <p>${
                                            currentConditions[0].WeatherText
                                          }</p>
                                          <p>${localDateTime.toLocaleString()}</p>
                                        </div>
                                      </div>
                                      <div class="weather-icon-container">
                                        <img src="https://developer.accuweather.com/sites/default/files/${
                                          currentConditions[0].WeatherIcon
                                        }-s.png" alt="" srcset="">
                                      </div>
                                    </div>
                                    <div class="current-weather-data">
                                      <div class="weather-data"><p>Relative Humidity</p><p>${
                                        currentConditions[0].RelativeHumidity
                                      }%</p></div>
                                      <div class="weather-data"><p>Pressure</p><p>${
                                        currentConditions[0].Pressure.Metric
                                          .Value
                                      } ${
    currentConditions[0].Pressure.Metric.Unit
  }</p></div>
                                      <div class="weather-data"><p>UV Index</p><p>${
                                        currentConditions[0].UVIndex
                                      } (${
    currentConditions[0].UVIndexText
  })</p></div>
                                      <div class="weather-data"><p>Visibility</p><p>${
                                        currentConditions[0].Visibility.Metric
                                          .Value
                                      } ${
    currentConditions[0].Visibility.Metric.Unit
  }</p></div>
                                      <div class="weather-data"><p>Wind</p><p>${
                                        currentConditions[0].Wind.Speed.Metric
                                          .Value
                                      } ${
    currentConditions[0].Wind.Speed.Metric.Unit
  } ${currentConditions[0].Wind.Direction.Localized}</p></div>
                                    </div>
                                  </div>`;
  currentWeatherContainer.append(currentWeatherCard);
  console.log("Current conditions:");
  console.log(currentConditions);
}

function initialize() {
  const city = document.getElementById("city");
  const searchButton = document.getElementById("searchCityButton");
  const resultsSection = document.getElementById("results");
  const currentConditionsSection = document.getElementById("current-weather");
  const forecastSection = document.getElementById("forecast");

  searchButton.addEventListener("click", async () => {
    const cities = await getCityInformation(city.value);
    clearCitiesContainer();
    clearCurrentWeatherContainer();
    createCitiesGrid(cities, resultsSection);
  });
}

initialize();
