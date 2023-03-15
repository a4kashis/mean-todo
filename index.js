// import all the necessary packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// we are using port 8000
const port = 8000;

const todoRoutes = require("./routes/Todo");

const app = express();

// Use this to connect using MongoAtlas
const uri =
  "mongodb+srv://test:test@cluster0.8zqxoua.mongodb.net/test?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  // DB connection
  console.log("connection started");

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => {
      console.log("CONNECTED TO DATABASE");
    });

} catch (e) {
  console.log("could not connect");
  console.log(e);
}


// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON format
app.use(bodyParser.json());

// include the todoRoutes
app.use("/api", todoRoutes);

// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
