import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  weatherData: [
    {
      date: { type: Date, required: true },
      weather: { type: Object, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
