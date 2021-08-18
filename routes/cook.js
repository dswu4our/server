const router = require("express").Router();
const Ingre = require("../models/ingredients");
const recipe = require("../models/recipes");

const { response } = require("express");
var Youtube = require("youtube-node");
var youtube = new Youtube();

// 요리하기
router.post("/", (req, res) => {
  // 요리할 식재료 체크한거 배열로 가져와서
  const body = req.body;
  console.log("ings_name: " + body.ings_name);
  var arr = [];
  for (var i = 0; i < body.ings_name.length; i++) {
    arr.push(body.ings_name[i]);
  }
  if (i > 10) return res.json("식재료의 개수가 초과되었습니다.");
  // console.log(arr);
  // 해당 모든 재료로 만들수 있는 레시피 검색
  var count = 0;
  recipe
    .find(
      {
        ings_name: { $all: arr },
      },
      function (err, results) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        // // 레시피 개수 1개 이하일때 재료 개수 하나빼고 다시 검색
        // if (results.count < 1) {
        //   arr.pop(0);
        //   console.log(arr);
        //   recipe.find(
        //     {
        //       ings_name: { $all: arr },
        //     },
        //     function (err, results) {
        //       if (err) return res.status(500).send({ error: err.message });
        //       res.status(200).json(results);
        //     }
        //   );
        // }
        res.status(200).json(results);
      }
    )
    .limit(10) // 레시피 개수 10개 제한
    .select("recipe_name");
});

// 유투브 영상 리스트

// 유투브 영상으로 넘겨주기
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
  res.end(url);
});

module.exports = router;
