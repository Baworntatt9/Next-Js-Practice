const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 1000,
});

app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use(hpp());
app.use(cors());

const menuRoute = require("./routes/menuRoute");
const authRoute = require("./routes/authRoute");

app.use("/api/v1/menus", menuRoute);
app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${process.env.HOST}:${PORT}`
  )
);

//handle unhandeled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
