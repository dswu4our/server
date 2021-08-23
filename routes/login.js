// login.js
const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("get");
    //console.log(req.query['code']);
  res.send("access code 지급 완료");
});

module.exports = router;