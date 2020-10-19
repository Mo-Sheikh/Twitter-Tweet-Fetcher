const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const handler = require("./tweetFetcher");

app.get("/tweets", (req, res) => {
  try {
    console.log("HIT");
    const user = req.query.user;
    const days = req.query.days;
    const retweetCount = req.query.retweetCount;
    const tweets = handler
      .handler(user, days, retweetCount)
      .then((response) => {
        console.log("git the respionse");
        res.send(response);
      });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports.app = app;
