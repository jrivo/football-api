const express = require("express");
const utils = require("./utils");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getNextMatch/:teamId", (req, res) => {
  utils.getNextMatch(req.params.teamId).then((response) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send(response);
  });
});

app.get("/getCurrentMatch/:matchId", (req, res) => {
  utils.getCurrentMatchInfo(req.params.matchId).then((response) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send(response);
  });
});

app.get("/getFinishedMatch/:matchId", (req, res) => {
  utils.getFinishedMatch(req.params.matchId).then((response) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send(response);
  });
});

app.get("/getLastMatches/:teamId", (req, res) => {
  utils.getLastMatches(req.params.teamId).then((response) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send(response);
  });
});

app.get("/getOdds/:teamId", (req, res) => {
  utils.threeOdds(req.params.teamId).then((response) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send(response);
  });
})

app.listen(port, () => console.log(`Listening on port + ${port}!`));
