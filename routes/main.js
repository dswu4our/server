const router = require("express").Router();
// const ingredients = require('../models/ingredients');
const Ingredient = require("../models/ingredients");

// 나의 재료 보여주기
router.get("/", (req, res) => {
  const query = req.query;
  // console.log("frozen" : " + query.frozen); // 냉장: frozen = 0/ 냉동: frozen = 1

  // Ingredient.find(function (err, ings) {
  //   if (err) {
  //     return res.status(500).send({ error: err.message });
  //   }
  //   res.status(200).json(ings);
  // }).select("ing_id name img");
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
