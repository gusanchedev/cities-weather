const ACCUWEATHER_API_KEY = "STS8XKAVsQmUA0sfiVWiGsxFSpw3wble";
const ACCUWEATHER_CITY_SEARCH_API = `http://dataservice.accuweather.com/locations/v1/cities/search`;

async function getCityInfo(city) {
  const apiUrl =
    ACCUWEATHER_CITY_SEARCH_API + `?apikey=${ACCUWEATHER_API_KEY}&q=${city}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}

const searchButton = document.getElementById("searchCityButton");
searchButton.addEventListener("click", async (e) => {
  // e.preventDefault();
  const city = document.getElementById("city");
  console.log(city.value);
  const data = await getCityInfo(city.value);
  console.log(data);
});
