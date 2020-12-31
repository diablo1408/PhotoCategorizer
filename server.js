const cors = require("cors");
const express = require("express");
// const Redis = require("ioredis");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const visionRoute = require("./routes/vision");
const userRoute = require("./routes/user");
const downloadRoute = require("./routes/download");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
// app.use(express.static("frontend/build"));

//initialise redis
// const redis = new Redis();

// client.set("user","admin",redis.print);
// client.get("user",redis.print);

mongoose.connect("mongodb://localhost:27017/vision", { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/api/images",visionRoute); //cache
app.use("/api/users",userRoute);
app.use("/api",downloadRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
