// camera.js
const mongoose = require("mongoose");
const router = require("express").Router();
const Users_Ingredients = require("../models/users_ingredients");
const path = require("path");
var request = require("request");
const { spawn } = require("child_process"); // 파이썬 호출
// var models = require("../models");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bodyParser = require("body-parser");
// var formidable = require("formidable");
// config 파일 저장안해서 일단 주석처리
const aws = require("aws-sdk");
const dirpath = path.join(__dirname, "/awsconfig.json");
// aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");
aws.config.loadFromPath(dirpath);

const s3 = new aws.S3(); // var Op = models.Sequelize.Op;

var fs = require("fs");

var storage = multerS3({
  //s3
  s3: s3,
  bucket: "ingredients-img",
  acl: "public-read",
  key: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    cb(null, Date.now().toString() + extension);
    // key: "img/" + "tomato",
  },
});
var upload = multer({ storage: storage });

// s3에 이미지 업로드
router.get("/upload", async (req, res) => {
  res.render("upload.html");
});

router.post("/upload", upload.single("imgFile"), async (req, res) => {
  try {
    res.send({
      //파일 정보 넘김
      message: "upload success",
      status: "success",
      data: {
        file: req.file,
      },
    });
  } catch (err) {
    //무언가 문제가 생김
    res.send({
      message: "ERROR",
      status: "fail",
    });
  }
});

// // 플라스크 서버의 api를 호출하여 그 결과를 받아 다시 프론트에 넘겨주는 코드
// router.post("/", async (req, res) => {
//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     res.writeHead(200, { "content-type": "text/plain" });
//     res.write("received upload:\n\n");
//     res.end(util.inspect({ fields: fields, files: files }));
//   });
//   let f = files;
//   console.log("file: " + f);
//   // const image = body.image1;
//   // console.log(image);
//   const options = {
//     method: "POST",
//     url: "http://127.0.0.1:4500/predict",
//     data: {
//       image1: f,
//     },
//     // body: image,
//     // json: true,
//   };

//   const flsk = request(options, (label) => {
//     console.log("response:" + label);
//     res.end(JSON.stringify(label));
//   });
//   flsk.on("error", (e) => {
//     console.log("flask result error");
//   });

//   // res.send(returndata);
// });

// // 재료 인식 결과
// router.get("/", async (req, res) => {
//   let dataToSend;
//   const python = spawn("python3", [
//     "C:/Users/ji_ji/OneDrive/바탕 화면/냉부해/4our_AI/runserver.py",
//   ]);
//   python.stdout.on("data", (data) => {
//     // label이 data였음
//     console.log(dataToSend);
//     dataToSend = data.toString();
//     res.write(data);
//     res.end("end");
//   });
//   //   python.on("close", (code) => {
//   //     res.send(dataToSend);
//   //   });
// });

// 재료 인식 결과 추가하기
router.post("/list", async (req, res) => {
  const body = req.body;
  console.log(body);
  var list = [];
  for (var i = 0; i < body.length; i++) {
    const li = {
      user_id: body[i].user_id,
      ing_name: body[i].ing_name,
      ing_frozen: body[i].ing_frozen,
      ing_expir: body[i].ing_expir,
    };
    list.push(li);
  }
  Users_Ingredients.insertMany(list, function (err, result) {
    if (err) throw err;
    console.log("inserted");
    return;
  });
  res.json("success");
});

// 재료 인식 리스트
// router.get("/list", async (req, res) => {
//   const list = req.list;
// });
module.exports = router;
