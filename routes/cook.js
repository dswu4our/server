const router = require("express").Router();
const Ingre = require("../models/ingredients");
const recipe = require("../models/recipes");

// 요리하기
router.get("/", (req, res) => {
  // 요리할 식재료 체크한거 배열로 가져와서
  const array = req.body;
  console.log("ing_id: " + array);
  // 만들수 있는 레시피 검색
  recipe.find(function (err, results) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).json(results);
  });
});


// 레시피 생성
router.post("/", (req, res) => {
  const recipes = new recipe(req.body);
  recipes.save((error, results) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({
      success: true, results
    });
  });
});

// 유투브 영상 리스트

// 유투브 영상으로 넘겨주기

module.exports = router;
