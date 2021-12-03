const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const employeeController = require("./controllers/employee");

require("dotenv").config();

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, connectOptions);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});  

app.use("/api/v1/employees", employeeController);
