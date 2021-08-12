//search.js
const router = require("express").Router();
const mongoose = require("mongoose");
const Ingredient = require("../models/ingredients");
const Users_Ingredients = require("../models/users_ingredients");

// 재료 검색
router.get("/", (req, res) => {
  const body = req.body;
  console.log(body.ing_name);

  Ingredient.find(
    {
      ing_name: body.ing_name,
    },
    function (err, ings) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.json(ings);
    }
  ).select("ing_name");
});

// 재료 검색 DB 추가
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body.ing_name);
  var ing = {
    user_id: body.user_id,
    ing_name: body.ing_name,
    ing_frozen: body.ing_frozen,
    ing_expir: body.ing_expir,
  };

  Users_Ingredients.create(ing, function (err, result) {
    if (err) throw err;
    console.log("inserted");
    return;
  });
  res.json("success");
});

// 담은 재료

module.exports = router;
