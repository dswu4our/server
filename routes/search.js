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
  Users_Ingredients.find({ user_id: query.user_id, check: 2 })
    .populate("ing")
    .select("ing_name ing_frozen ing_expir ing_img")
    .exec((err, data) => {
      console.log(data);
      res.status(200).json(data);
    });
});

// 재료 검색한것 DB 추가
router.post("/list", (req, res) => {
  const body = req.body;
  var list = [];
  // 객체 만들기
  for (var i = 0; i < body.length; i++) {
    var li = Users_Ingredients({
      user_id: body[i].user_id,
      ing_frozen: body[i].ing_frozen,
      ing_expir: body[i].ing_expir,
    });
    list.push(li);
  }
  console.log(list);
  // console.log(i)
  var l = 0;
  var b = 0;
  // ing의 id 찾아서 Users_Ingredients 객체의 ing에 삽입
  for (var n = 0; n < body.length; n++) {
    Ingredient.findOne({ ing_name: body[b++].ing_name })
      .select("_id")
      .exec((err, data) => {
        if (err) throw err;
        console.log(data);
        console.log("l: " + l + " n:" + n);

        Users_Ingredients.create(
          {
            user_id: list[l].user_id,
            ing_frozen: list[l].ing_frozen,
            ing_expir: list[l++].ing_expir,
            check: 0,
            ing: data,
          },
          function (err, result) {
            if (err) throw err;
            console.log("inserted");
          }
        );
      });
  }
  res.status(200).json("success");
});

router.post("/", (req, res) => {
  const body = req.body;
  var list = [];
  // 객체 만들기
  for (var i = 0; i < body.length; i++) {
    var li = Users_Ingredients({
      user_id: body[i].user_id,
      ing_frozen: body[i].ing_frozen,
      ing_expir: body[i].ing_expir,
    });
    list.push(li);
  }
  console.log(list);
  // console.log(i)
  var l = 0;
  var b = 0;
  // ing의 id 찾아서 Users_Ingredients 객체의 ing에 삽입
  for (var n = 0; n < body.length; n++) {
    Ingredient.findOne({ ing_name: body[b++].ing_name })
      .select("_id")
      .exec((err, data) => {
        if (err) throw err;
        console.log(data);
        console.log("l: " + l + " n:" + n);

        Users_Ingredients.create(
          {
            user_id: list[l].user_id,
            ing_frozen: list[l].ing_frozen,
            ing_expir: list[l++].ing_expir,
            check: 2,
            ing: data,
          },
          function (err, result) {
            if (err) throw err;
            console.log("inserted");
          }
        );
      });
  }
  res.status(200).json("success");
});

module.exports = router;
