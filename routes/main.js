const router = require("express").Router();
// const ingredients = require('../models/ingredients');
const Ingredient = require("../models/ingredients");

// 나의 재료 보여주기
router.get("/", (req, res) => {
  const query = req.query;
  console.log("User name : " + query.user_id);

  Users_Ingredients.find(
    {
      user_id: query.user_id,
      ing_frozen: query.ing_frozen,
    },
    function (err, ing_id) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(200).json(ing_id);
    }
  ).select("ing_name ing_expir ing_img");
});

// ingredients DB 재료 모두 보여주기
router.get("/all", (req, res) => {
  Ingredient.find(function (err, ings) {
    if (err) return res.status(500).send({ error: "db failure" });
    res.json(ings);
  });
});

// 재료 생성
// router.post("/", (req, res) => {
//   const ing = new Ingredient(req.body);
//   ing.save((error, ingreInfo) => {
//     if (error) return res.json({ success: false, error });
//     return res.status(200).json({
//       success: true,
//     });
//   });
// });

// 삭제
router.delete("/", (req, res) => {
  const query = req.query;
  console.log("id :" + query.id);

  Ingredient.deleteOne({ ing_id: query.id }, function (err, result) {
    if (err) {
      console.error("delete one error", err);
      return;
    }
    console.log("delete 성공", result);
  });
});

module.exports = router;
