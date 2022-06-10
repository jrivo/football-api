require("dotenv").config();

const axios = require("axios");
const { get } = require("http");
const https = require("https");

const URL = "http://apiv3.apifootball.com";

function getOdds(odds) {
  res = {};
  for (let odd in odds) {
    o = odds[odd];
    if (o.odd_name == "Fulltime Result") {
      // console.log(o);
      switch (o.type) {
        case "Home":
          res.home = o.value;
          break;
        case "Away":
          res.away = o.value;
          break;
        case "Draw":
          res.draw = o.value;
      }
    }
  }
  return res;
}

function getWinner(home, away) {
  // console.log(home.score, away.score);
  if (parseInt(home.score) > parseInt(away.score)) {
    return home.name;
  } else if (parseInt(home.score) < parseInt(away.score)) {
    return away.name;
  } else {
    return "Draw";
  }
}

async function getLogos(matchId) {
  try {
    res = [];
    const parameters = {
      match_id: matchId,
      action: "get_events",
      APIkey: process.env.API_KEY,
    };

    let data = (
      await axios.get(URL + "?" + new URLSearchParams(parameters).toString())
    ).data[0];
    res[0] = data.team_home_badge;
    res[1] = data.team_away_badge;
    return res
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getCurrentMatchInfo(matchId) {
  try {
    res = {};
    const parameters = {
      match_id: matchId,
      action: "get_live_odds_commnets",
      APIkey: process.env.API_KEY,
    };
    // data = (await axios.get(
    //   URL + "?" + new URLSearchParams(parameters).toString()).data
    // )[parameters.match_id];
    let data = (
      await axios.get(URL + "?" + new URLSearchParams(parameters).toString())
    ).data[parameters.match_id];
    odds = getOdds(data.live_odds);
    logos = await getLogos(matchId);
    console.log(logos)
    homeTeam = {
      name: data.match_hometeam_name,
      logo: logos[0],
      score: data.match_hometeam_score,
      victoryOdd: odds.home,
    };
    awayTeam = {
      name: data.match_awayteam_name,
      logo: logos[1],
      score: data.match_awayteam_score,
      victoryOdd: odds.away,
    };
    match = {
      started: true,
      finished: false,
      time: data.match_status,
      drawOdd: odds.draw,
      league: data.league_name,
    };
    res = { match, homeTeam, awayTeam };
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return "No rights for this match";
  }
}

async function getFinishedMatchInfo(matchId) {
  try {
    res = {};
    const parameters = {
      match_id: matchId,
      action: "get_events",
      APIkey: process.env.API_KEY,
    };

    data = (
      await axios.get(URL + "?" + new URLSearchParams(parameters).toString())
    ).data[0];
    homeTeam = {
      name: data.match_hometeam_name,
      logo: data.team_home_badge,
      score: data.match_hometeam_ft_score,
    };
    awayTeam = {
      name: data.match_awayteam_name,
      logo: data.team_away_badge,
      score: data.match_awayteam_ft_score,
    };
    match = {
      started: true,
      finishd: true,
      winner: getWinner(homeTeam, awayTeam),
      league: data.league_name,
    };
    res = { match, homeTeam, awayTeam };
    return res;
  } catch (err) {
    console.log(err);
    return "No rights for this match";
  }
}

async function getNextMatch(teamId) {
  try {
    res = {};
    const d = new Date();
    let year = d.getFullYear();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let day = ("0" + d.getDate()).slice(-2);
    const parameters = {
      team_id: teamId,
      action: "get_events",
      APIkey: process.env.API_KEY,
      from: year + "-" + month + "-" + day,
      to: (parseInt(year) + 1).toString() + "-" + month + "-" + day,
    };

    let data = (
      await axios.get(URL + "?" + new URLSearchParams(parameters).toString())
    ).data[0];
    console.log(data);
    //if next match has started, get current match info
    if (data.match_status == "") {
      homeTeam = {
        name: data.match_hometeam_name,
        logo: data.team_home_badge,
      };
      awayTeam = {
        name: data.match_awayteam_name,
        logo: data.team_away_badge,
      };
      match = {
        id: data.match_id,
        started: false,
        finished: false,
        date: data.match_date,
        time: data.match_time,
        league: data.league_name,
      };
      res = { match, homeTeam, awayTeam };
      return res;
    } else {
      console.log("match started");
      return getCurrentMatchInfo(data.match_id);
    }
  } catch (err) {
    console.log(err);
    return "No rights for this team";
  }
}

async function getTeamInfo(teamId) {
  const parameters = {
    action: "get_teams",
    APIkey: process.env.API_KEY,
    team_id: teamId,
  };

  res = await axios.get(URL + "?" + new URLSearchParams(parameters).toString());
  return res;
}

// getNextMatch(1060).then((res) => console.log(res));
// getFinishedMatchInfo(1029890).then((res) => console.log(res));
// getCurrentMatchInfo(1054210).then((res) => console.log(res));
// getCurrentMatchInfo(1006149).then((res) => console.log(res));
module.exports = {
  getCurrentMatchInfo,
  getFinishedMatchInfo,
  getNextMatch,
};