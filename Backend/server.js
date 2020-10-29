const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const fs = require("fs");
const handler = require("./RetrieveTweets/RetrieveTweets");
require("dotenv").config();

app.use(cors());

app.get("/fetchTweets", async (req, res) => {
  try {
    const user = req.query.user;
    const days = req.query.days;
    const retweetCount = req.query.retweetCount;

    handler.retrieveTweets(user, days, retweetCount, null, (u) => {
      console.log("sending");
      res.send(u);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports.app = app;
