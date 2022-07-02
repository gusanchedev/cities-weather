const ACCUWEATHER_API_KEY = "STS8XKAVsQmUA0sfiVWiGsxFSpw3wble";
const ACCUWEATHER_CITY_SEARCH_API = `http://dataservice.accuweather.com/locations/v1/cities/search`;

async function getCityInfo(city) {
  const apiUrl =
    ACCUWEATHER_CITY_SEARCH_API + `?apikey=${ACCUWEATHER_API_KEY}&q=${city}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}

function clearScreen() {
  let citiesList = document.getElementById("cities");
  citiesList.remove();
}

const searchButton = document.getElementById("searchCityButton");

searchButton.addEventListener("click", async (e) => {
  clearScreen();
  const city = document.getElementById("city");
  const data = await getCityInfo(city.value);
  let resultsSection = document.getElementById("results");
  let citiesList = document.createElement("div");
  citiesList.id = "cities";
  resultsSection.append(citiesList);
  data.forEach((city) => {
    let cityElement = document.createElement("p");
    cityElement.innerHTML = `<a href='${city.Key}'>${city.EnglishName} / ${city.Region.LocalizedName} / ${city.Country.LocalizedName} / ${city.AdministrativeArea.LocalizedName}</a>`
    citiesList.append(cityElement);
  });
});
