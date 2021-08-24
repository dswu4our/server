// env
require("dotenv").config();

// dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const { spawn } = require("child_process"); // 파이썬 호출
const app = express();
const port = process.env.PORT || 4500;

const { Ingredient } = require('./models/ingredients');
const { User } = require('./models/users');
const { Users_Ingredients } = require('./models/users_ingredients');
const { Recipe } = require('./models/recipes');
const { Users_Reicpes } = require('./models/users_recipes');
const { Users_Baskets} = require('./models/users_baskets');

// s3 업로드 되는지 확인하기위한 추가 코드
/*app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);*/

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
app.use("/manage", require("./routes/manage"));
app.use("/mypage", require("./routes/mypage"));
app.use("/camera", require("./routes/camera"));
app.use("/search", require("./routes/search"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
