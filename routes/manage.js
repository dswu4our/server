const router = require("express").Router();
// const ingredients = require('../models/ingredients');
const Ingred = require("../models/ingredients");

// 나의 재료 보여주기
router.get("/", (req, res) => {});

// 요리하기
router.post("/", (req, res) => {
  const ing = new ingredients(req.body);
  ing.save((error, ingreInfo) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({
      success: true,
    });
  });
  // .then(ing => res.send(ing))
  // .catch(err => res.status(500).send(err));
});

module.exports = router;
