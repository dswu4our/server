// main.js
const router = require("express").Router();
const Ingredient = require("../models/ingredients");
const Users_Ingredients = require("../models/users_ingredients");
const Recipe = require("../models/recipes");

// 나의 재료 보여주기
router.get("/", (req, res) => {
  const query = req.query;
  console.log("User name : " + query.user_id);

  Users_Ingredients.find(
    {
      user_id: query.user_id,
      ing_frozen: query.ing_frozen,
      check: query.check,
    },
    function (err, ing_id) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(200).json(ing_id);
    }
  ).select("ing_name ing_expir ing_img");
});

// 요리하기
router.post("/", async (req, res) => {
  const body = req.body;

  // 배열에 식재료 넣기
  var arr = [];
  var new_arr = [];
  for (var i = 0; i < body.ings_name.length; i++) {
    arr.push(body.ings_name[i]);
    new_arr.push(body.ings_name[i]);
  }
  if (i > 10) return res.json("식재료의 개수가 초과되었습니다.");

  // 해당 모든 재료로 만들수 있는 레시피 검색
  var count = 0;
  var rec_arr = [];
  var res_arr = [];

  for (var i in arr) {
    await Recipe.find(
      {
        ings_name: { $all: new_arr },
      },
      function (err, results) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        count = count + results.length;
        // console.log("count: " + count);

        for (var i in results) {
          rec_arr.push(results[i]);
        }
        // rec_arr에서 중복원소 제거
        res_arr = rec_arr.filter((item, i) => {
          return (
            rec_arr.findIndex((item2, j) => {
              return item.recipe_name === item2.recipe_name;
            }) === i
          );
        });
        // console.log("rec_arr: " + rec_arr);
        // console.log(res_arr);
      }
    )
      .where("ings_name")
      .in(arr)
      .limit(10) // 레시피 개수 10개 제한
      .select("recipe_name")
      .catch(function (error) {
        console.log("catch err");
      });

    // 배열의 식재료 하나 줄이기
    await new_arr.pop();
    // console.log("pop arr: " + new_arr);
    if (count >= 10) {
      return res.status(200).json(res_arr);
      // res.render("cook", { recipe_name: rec_arr });
    }
  } // for문 end
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
