import express from "express";
import mongoose from "mongoose";
import cron from "node-cron";
import UserRoute from "./routes/user.routes.js";
import fetchWeatherData from "./utils/fetchWeatherData.js";
import sendWeatherEmail from "./utils/sendWeatherEmail.js";

//Create a new express application
const app = express();
app.use(express.json());

app.use("/user", UserRoute);

//Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://madhuwanthapiyumal:1234@nodejsbackendapplicatio.hgcssmh.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected 💻"))
  .catch((error) => console.log("MongoDB connection error:", error));

//connect the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));

// Schedule a task to fetch weather data every 3 hours
cron.schedule("0 */3 * * *", async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const weatherData = await fetchWeatherData(user.location);
      user.weatherData.push({ date: new Date(), weather: weatherData });
      await user.save();
      await sendWeatherEmail(user, weatherData);
    }
  } catch (error) {
    console.error(`Error in scheduled task: ${error}`);
  }
});
