const router = require("express").Router();

const Users_Recipes = require("../models/users_recipes");
const Recipe = require("../models/recipes");

const { response } = require("express");
var Youtube = require("youtube-node");
var youtube = new Youtube();

// [찜하기]
router.post("/myheart", (req, res) => {
  const body = req.body;

  Users_Recipes.exists(
    {
      user_id: req.body.user_id,
      recipe_name: req.body.recipe_name,
    },
    function (err, result) {
      if (result == false) {
        Users_Recipes.insertMany(
          {
            user_id: body.user_id,
            recipe_name: body.recipe_name,
            recipe_ht: 1,
          },
          function (err) {
            if (err) {
              return res.status(500).send({ error: err.message });
            }
            res.status(200);
            console.log("success : insert users_recipe and ht");
          }
        );
      } else {
        Users_Recipes.findOneAndUpdate(
          { user_id: req.body.user_id, recipe_name: req.body.recipe_name },
          { $set: { recipe_ht: 1 } },
          function (err) {
            if (err) {
              return res.status(500).send({ error: err.message });
            }
            res.status(200);
            console.log("success : recipe_ht = 1");
          }
        );
        //console.log("Result :", result);
      }
    }
  );
});

// [유투브 영상으로 넘겨주기]
router.post("/list", (req, res) => {
  const body = req.body;
  //var word = req.body; // 검색어 지정
  var limit = 5; // 출력 갯수

  youtube.setKey("AIzaSyCK0H1wFZltvI4093gwJoQ4Vh2atbZyTy8"); // API 키 입력

  var url = "https://www.youtube.com/results?search_query=" + body.recipe_name;

  //// 검색 옵션 시작
  youtube.addParam("order", "rating"); // 평점 순으로 정렬
  youtube.addParam("type", "video"); // 타입 지정
  youtube.addParam("videoLicense", "creativeCommon"); // 크리에이티브 커먼즈 아이템만 불러옴
  //// 검색 옵션 끝

  youtube.search(body.recipe_name, limit, function (err, result) {
    // 검색 실행
    if (err) {
      console.log(err);
      return;
    } // 에러일 경우 에러공지하고 빠져나감
    console.log("URL : " + url);
    console.log("-----------");
  });

  Users_Recipes.exists(
    {
      user_id: req.body.user_id,
      recipe_name: req.body.recipe_name,
    },
    function (err, result) {
      if (result == false) {
        Users_Recipes.insertMany(
          {
            user_id: body.user_id,
            recipe_name: body.recipe_name,
            recipe_check: 1,
          },
          function (err) {
            if (err) {
              return res.status(500).send({ error: err.message });
            }
            res.status(200);
            console.log("success : insert users_recipe and check");
          }
        );
      } else {
        Users_Recipes.findOneAndUpdate(
          { user_id: req.body.user_id, recipe_name: req.body.recipe_name },
          { $set: { recipe_check: 1 } },
          function (err) {
            if (err) {
              return res.status(500).send({ error: err.message });
            }
            res.status(200);
            console.log("success : recipe_check = 1");
          }
        );
        //console.log("Result :", result);
      }
    }
  );
  res.end(url);
});

module.exports = router;
