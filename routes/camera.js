// camera.js
const mongoose = require("mongoose");
const router = require("express").Router();

const path = require("path");
var request = require("request");
const { spawn } = require("child_process"); // 파이썬 호출
// var models = require("../models");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bodyParser = require("body-parser");
const Ingredient = require("../models/ingredients");
const Users_Ingredients = require("../models/users_ingredients");
// var formidable = require("formidable");
// config 파일 저장안해서 일단 주석처리
// const aws = require("aws-sdk");
// const dirpath = path.join(__dirname, "/../config/awsconfig.json");
// // aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");
// aws.config.loadFromPath(dirpath);

// const s3 = new aws.S3(); // var Op = models.Sequelize.Op;

// var fs = require("fs");

// var storage = multerS3({
//   //s3
//   s3: s3,
//   bucket: "ingredients-img",
//   acl: "public-read",
//   key: function (req, file, cb) {
//     let extension = path.extname(file.originalname);
//     cb(null, Date.now().toString() + extension);
//     // key: "img/" + "tomato",
//   },
// });
// var upload = multer({ storage: storage });

// // s3에 이미지 업로드
// router.get("/upload", async (req, res) => {
//   res.render("upload.html");
// });

// router.post("/upload", upload.single("imgFile"), async (req, res) => {
//   try {
//     res.send({
//       //파일 정보 넘김
//       message: "upload success",
//       status: "success",
//       data: {
//         file: req.file,
//       },
//     });
//   } catch (err) {
//     //무언가 문제가 생김
//     res.send({
//       message: "ERROR",
//       status: "fail",
//     });
//   }
// });

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

// 저장하고 다른 재료 추가하기
router.post("/add", async (req, res) => {
  const body = req.body;

  Ingredient.findOne({ ing_name: body.ing_name })
      .select("_id")
      .exec((err, data) => {
        if (err) throw err;
        console.log(data);
        // console.log("l: " + l + " n:" + n);

        Users_Ingredients.create(
          {
            user_id: body.user_id,
            ing_frozen: body.ing_frozen,
            ing_expir: body.ing_expir,
            check: 1,
            ing: data,
          },
          function (err, result) {
            if (err) throw err;
            console.log("inserted");
            res.status(200).json("inserted success");
          }
        );
      });
})

//재료 인식 리스트 => check가 1인것만 불러오기 = 카메라로 재료 인식한애들은 무조건 check가 1임
router.get("/list", async (req, res) => {
  const query = req.query;
  Users_Ingredients.find({ user_id: query.user_id, check: 1 })
    .populate("ing")
    .select("ing_name ing_frozen ing_expir ing_img")
    .exec((err, data) => {
      console.log(data);
      res.status(200).json(data);
    });
});

// 재료 삭제하기
router.delete("/list", async (req, res) => {
  // Users_Ingredients.remove({
  //   user_id: query.user_id,
  //   ing_name: body.ing_name,
  //   check: 1,
  //   list: 0
  // }, function(err, result){
  //   if(err) return res.status(500).json({error: err.message});
  //   res.status(200).json(result);
  // })
  Users_Ingredients.findByIdAndDelete({_id: req.body._id}, function(err, result) {
    if (err) throw err;
    console.log("deleted");
    res.status(200).json(result);
  });
})

// 재료 인식 결과 추가하기
// check를 0으로 해야 냉장고로 들어감
router.post("/list", async (req, res) => {
  const body = req.body;
  var list = [];
  // 객체 만들기
  for (var l = 0; l < body.length; l++){
    Users_Ingredients.updateOne(
      {
        _id: body[l]._id,
        user_id: body[l].user_id,
      },
      {
        $set: {
        check: 0,
        ing_frozen: body[l].ing_frozen,
        ing_expir: body[l].ing_expir,
      }
      }, function(err, result) {
        if (err) throw err;
        console.log("update");
      }
    );
  }
  // for (var i = 0; i < body.length; i++) {
  //   var li = Users_Ingredients({
  //     user_id: body[i].user_id,
  //     ing_frozen: body[i].ing_frozen,
  //     ing_expir: body[i].ing_expir,
  //   });
  //   list.push(li);
  // }
  // console.log(list);
  // // console.log(i)
  // var l = 0;
  // var b = 0;
  // // ing의 id 찾아서 Users_Ingredients 객체의 ing에 삽입
  // for (var n = 0; n < body.length; n++) {
  //   Ingredient.findOne({ ing_name: body[b++].ing_name })
  //     .select("_id")
  //     .exec((err, data) => {
  //       if (err) throw err;
  //       console.log(data);
  //       console.log("l: " + l + " n:" + n);

  //       Users_Ingredients.create(
  //         {
  //           user_id: list[l].user_id,
  //           ing_frozen: list[l].ing_frozen,
  //           ing_expir: list[l++].ing_expir,
  //           check: 0,
  //           ing: data,
  //         },
  //         function (err, result) {
  //           if (err) throw err;
  //           console.log("inserted");
  //         }
  //       );
  //     });
  // }
  res.status(200).json("update success");
});

module.exports = router;
