// env
require("dotenv").config();

// dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4500;
// const { Ingredient } = require('./models/ingredients')

// static file service
app.use(express.static("public"));
// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

// routers
app.use("/main", require("./routes/main"));
app.use("/cook", require("./routes/cook"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
