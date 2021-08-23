const router = require("express").Router();

const User = require("../models/users");
const Users_Recipes = require("../models/users_recipes");

const { response } = require("express");

var Youtube = require("youtube-node");
var youtube = new Youtube();

// 마이페이지
router.get("/", (req, res) => {
    
    const query = req.query;
    console.log("user_id: " + query.user_id);
    
    User.find(
      {
        user_id: query.user_id
      },
        function (err, results) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(200).json(results);
    }).select("email name");
  });

// 요리내역
router.get("/mycook", (req, res) => {
    
    const query = req.query;
    console.log("user_id: " + query.user_id);
    
    Users_Recipes.find(
      {
        user_id: query.user_id
      },
        function (err, results) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(200).json(results);
    }).select("recipe_check recipe_name");
});


// 요리내역 -> 레시피 선택 -> 링크
router.post("/mycook", (req, res) => {
    const body = req.body;
    
    console.log(body);
  
    youtube.setKey("AIzaSyCK0H1wFZltvI4093gwJoQ4Vh2atbZyTy8"); // API 키 입력
    var limit = 5; // 출력 갯수
    var url = "https://www.youtube.com/results?search_query=" + body.recipe_name;

    youtube.search(body.recipe_name, limit, function (err, result) {
        // 검색 실행
        if (err) {
          console.log(err);
          return;
        } // 에러일 경우 에러공지하고 빠져나감
          console.log("URL : " + url);
          console.log("-----------");
      });
           
        res.end(url);
    });
    
// 찜한 목록
router.get("/myheart", (req, res) => {
    
    const query = req.query;
    console.log("user_id: " + query.user_id);
    
    Users_Recipes.find(
      {
        user_id: query.user_id
      },
        function (err, results) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(200).json(results);
    })
    .where("recipe_ht").equals(1)
    .select("recipe_name");
});


module.exports = router;
