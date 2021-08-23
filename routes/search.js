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
    .select("ing_name ing_frozen ing_expir img")
    .exec((err, data) => {
      console.log(data);
      res.status(200).json(data);
    });
});

// 재료 검색한것 DB 추가
router.post("/list", (req, res) => {
  const body = req.body;
  var IngId;
  var list = [];
  // Ingredient.findOne({ ing_name: body[i].ing_name })
  //   .select("_id")
  //   .exec((err, data) => {
  //     IngId = new mongoose.Types.ObjectId(data._id);
  //     console.log(IngId);
  //   });
  for (var i = 0; i < body.length; i++) {
    let li = {
      user_id: body[i].user_id,
      ing_frozen: body[i].ing_frozen,
      ing_expir: body[i].ing_expir,
      // check: 0,
    };
    list.push(li);
  }
  console.log(list);
  for (var i = 0; i < body.length; i++) {
    // let ingObj = li.ing;
    // let users_ingObj = li; //let savedIngObj =
    Ingredient.findOne({ ing_name: body[i].ing_name })
      .select("_id")
      .exec((err, data) => {
        if (err) throw err;
        let ui = Users_Ingredients({
          user_id: list[i].user_id,
          ing_frozen: list[i].ing_frozen,
          ing_expir: list[i].ing_expir,
          check: 0,
          ing: data,
        });
        ui.save((err, result) => {
          console.log("save");
          console.log(result);
        });
        // IngId = new mongoose.Types.ObjectId(data._id);
        // // savedIngObj._id = new mongoose.Types.ObjectId(savedIngObj._id);
        // console.log("savedingobj:" + IngId);
        // users_ingObj.ing = IngId;
      });
    // list.push(li);
  }
  // console.log(list);
  // Users_Ingredients.insertMany(list, function (err, result) {
  //   if (err) throw err;
  //   // console.log(result);
  //   res.json("success");
  // });
  res.json("success");
});

module.exports = router;
