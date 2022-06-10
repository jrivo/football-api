require("dotenv").config();
const axios = require("axios");
const https = require("https");

const URL = "https://apiv3.apifootball.com";

// POST parameters
const parameters = {
  match_id: "1031041",
  action: "get_events",
  APIkey: process.env.API_KEY,
};

axios.get(URL+"?"+new URLSearchParams(parameters).toString())
  .then(res => {
    console.log('Status Code:', res.status);
    const data = res.data;
    console.log(data)

    // for(user of users) {
    //   console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    // }
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });