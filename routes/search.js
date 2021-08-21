//search.js
const router = require("express").Router();
const mongoose = require("mongoose");
const Ingredient = require("../models/ingredients");
const Users_Ingredients = require("../models/users_ingredients");

// 재료 검색
router.get("/", (req, res) => {
  const query = req.query;
  console.log(query.name);

  Ingredient.find(
    {
      ing_name: query.name,
    },
    function (err, ings) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.json(ings);
    }
  ).select("ing_name");
});

// 담은 재료 리스트 => 검색으로 넣고싶은 애들은 check가 2로 저장
router.get("/list", async (req, res) => {
  const query = req.query;
  var list = [];
  Users_Ingredients.find(
    { user_id: query.user_id, check: 2 }
    // function (err, result) {
    //   if (err) return res.status(500).send({ error: err.message });
    //   console.log("result:" + result);
    //   // for (var i = 0; i < result.length; i++) {
    //   //   Ingredient.findOne(
    //   //     {
    //   //       ing_name: result[i].ing_name,
    //   //     },
    //   //     function (err, r) {
    //   //       if (err) return res.status(500).send({ error: err.message });
    //   //       console.log("img:" + r);
    //   //       list.push(r.img);
    //   //       console.log("list: " + list);
    //   //       res.send(list);
    //   //     }
    //   //   ).select("img");
    //   // }
    //   // res.status(200).json(result);
    // }
  )
    .populate("Ingredient", "img")
    .select("ing_name ing_frozen ing_expir img")
    .exec((err, data) => {
      console.log(data);
      res.status(200).json(data);
    });
});

// 재료 검색 DB 추가
router.post("/list", (req, res) => {
  const body = req.body;
  console.log(body);
  var list = [];
  for (var i = 0; i < body.length; i++) {
    const li = {
      user_id: body[i].user_id,
      ing_name: body[i].ing_name,
      ing_frozen: body[i].ing_frozen,
      ing_expir: body[i].ing_expir,
      check: 0,
    };
    list.push(li);
  }
  Users_Ingredients.create(list, function (err, result) {
    if (err) throw err;
    console.log("inserted");
    return;
  });
  res.json("success");
});

module.exports = router;
