// Server-side global variables
require(`dotenv`).config({ path: `./config/.env` });

// Database
require(`./config/db`);

// Express
const express = require(`express`);
const router = require("./routes/movies");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middlewares
const authRoutes = require("./routes/auth");
app.use(express.json());
app.use("/api", authRoutes);

app.use(require(`body-parser`).json({ limit: "50mb" }));

// Routers
app.use(require(`./routes/movies`));

// Port
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Connected to port ` + process.env.SERVER_PORT);
});

// Error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Other errors
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});
