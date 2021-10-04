const router = require("express").Router();

const Users_Recipes = require("../models/users_recipes");
const Recipe = require("../models/recipes");

const { response } = require("express");
var Youtube = require("youtube-node");
var youtube = new Youtube();

// check & ht 할 요리리스트 users_recipe에 추가하기
router.post("/", (req, res) => {
  const body = req.body;
  Users_Recipes.insertMany(
    {
      user_id: body.user_id,
      recipe_name: body.recipe_name,
    },
    function (err) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(200);
      console.log("success : insert users_recipe");
    }
  );
});

// 찜하기
router.post("/myheart", async (req, res) => {
  const body = req.body;

  Users_Recipes.findOneAndUpdate(
    { user_id: req.body.user_id, recipe_name: req.body.recipe_name },
    { $set: { recipe_ht: 1 } }
  )
    .then((res) => {
      res.status(200);
      console.log("success : recipe_ht = 1");
    })
    .catch((err) => {
      console.log("@@err : ", err);
    });
});

// [유투브 영상으로 넘겨주기]
router.post("/cook", (req, res) => {
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

  //res.end(url);

  /*Users_Recipes.insertMany(
    {
      user_id: body.user_id,
      recipe_name: body.recipe_name,
    },
    function (err) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status("users_recipes insert");
    }
  );*/

  // 해당 유저가 본 레시피 체크 (users_recipes의 recipe_check=1)
  Users_Recipes.findOneAndUpdate(
    { user_id: req.body.user_id, recipe_name: req.body.recipe_name },
    { $set: { recipe_check: 1 } }
  )
    .then((res) => {
      console.log("success : recipe_check = 1");
    })
    .catch((err) => {
      console.log("@@err : ", err);
    });

  res.end(url);
});

module.exports = router;
