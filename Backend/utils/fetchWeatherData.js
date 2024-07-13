import axios from "axios";

const fetchWeatherData = async (city) => {
  const apiKey = "your_openweathermap_api_key";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    throw error;
  }
};

export default fetchWeatherData;
