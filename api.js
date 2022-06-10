const express = require("express");
const utils = require("./utils");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getNextMatch/:teamId", (req, res) => {
  utils.getNextMatch(req.params.teamId).then((response) => {
    res.send(response);
  });
});

app.get("/getCurrentMatch/:matchId", (req, res) => {
  utils.getCurrentMatchInfo(req.params.matchId).then((response) => {
    res.send(response)
  });
});

app.get("/getFinishedMatch/:matchId", (req, res) => {
  utils.getFinishedMatch(req.params.matchId).then((response) => {
    res.send(response)
  });
});

app.listen(port, () => console.log(`Listening on port + ${port}!`));
