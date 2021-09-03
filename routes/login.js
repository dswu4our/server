// login.js
const router = require("express").Router();
const Users = require("../models/users");

router.post("/", (req, res) => {
  var body = req.body;
  console.log(body);

  // if (User email이 있으면 user_id 찾기)
  Users.findOne({
    email: body.email,
    user_id: body.user_id
  }, function (err, result) {
    // else User email 없으면 user_id 부여 & user_id 주기
    if (result === null)
    {
      Users.create({
        email: body.email,
        user_id: body.user_id,
        name: body.name
      });
      res.status(200).json("success");
    }
    else {
      res.status(200).json(result);
    }
  })
  .select("user_id");
  
});

module.exports = router;