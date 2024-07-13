import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_email_password",
  },
});

const sendWeatherEmail = async (user, weatherData) => {
  const mailOptions = {
    from: "your_email@gmail.com",
    to: user.email,
    subject: "Hourly Weather Report",
    text: `Current weather in ${user.location}: ${weatherData.weather[0].description}, temperature: ${weatherData.main.temp}°K`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Weather report sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw error;
  }
};

export default sendWeatherEmail;
