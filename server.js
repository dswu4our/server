//express.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8100;

app.use(express.json()); //json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(cors()); //브라우저의 CORS 이슈를 막기 위해 사용하는 코드

// 나의 재료 보여주기
app.get("/main", async (req, res) => {
  const query = req.query;
  console.log("id :" + query.id + " frozen : " + query.frozen);
  res.send("나의 재료 보여주기");
});

// 요리하기
app.post("/main", async (req, res) => {
  const body = req.body;
  console.log(body.ingredients);
  res.send("요리하기");
});

//세팅한 app을 실행시킨다.
app.listen(port, () => {
  console.log("서버 on");
});
