const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const handler = require("./tweetFetcher");

app.get("/tweets", async (req, res) => {
  try {
    console.log("HIT");
    console.log(1);
    const user = req.query.user;
    const days = req.query.days;
    const retweetCount = req.query.retweetCount;
    console.log(2);
    handler.handler(user, days, retweetCount).then((i) => {
      console.log("alright");
      console.log(3);
    });
    console.log("here mate");
    console.log(4);
    fs.readFile("../Tweets.json", "utf8", (err, data) => {
      if (err) {
        console.log(5);
        console.log(err);
      }
      if (data) {
        console.log(6);
        console.log("we have data");
        res.send(JSON.parse(data));
      }
    });
    console.log(7);
    console.log("here mate");
  } catch (error) {
    console.log(8);
    res.sendStatus(500);
    console.log(error);
  }
  console.log(9);
});

module.exports.app = app;
