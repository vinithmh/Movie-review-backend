require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routerUrls = require("./routers/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

app.use(express.json());
app.use(cors());
app.use("/", routerUrls);
app.listen(port, () => console.log("Server is running"));
