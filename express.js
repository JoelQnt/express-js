import express from "express";
import homeController from "./controllers/homeController.js";
import servicesController from "./controllers/servicesController.js";
import contactController from "./controllers/contactController.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

const validateWorkingHour = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send(`
      <h1>Service Unavailable</h1>
      <p>Our web application is only available during working hours:</p>
      <p>Monday to Friday, 9:00 AM - 5:00 PM</p>
    `);
  }
};
app.use(validateWorkingHour)

app.get("/", homeController);
app.get("/services", servicesController);
app.get("/contact", contactController);

app.get("/contact");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
