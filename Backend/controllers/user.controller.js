import User from "../models/user.model.js";

// Create a new user or update the location of an existing user
export const createUser = async (req, res) => {
  const { email, location } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, location });
    } else {
      user.location = location;
    }
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update the location of an existing user
export const updateLocation = async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { location },
      { new: true }
    );
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get the weather data of a user for a specific date
export const getUserWetherData = async (req, res) => {
  const { email } = req.params;
  const { date } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const weatherData = user.weatherData.find(
      (data) => data.date.toISOString().split("T")[0] === date
    );
    if (!weatherData)
      return res.status(404).send("Weather data not found for the given date");

    res.send(weatherData);
  } catch (error) {
    res.status(400).send(error);
  }
};
