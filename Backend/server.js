const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const fs = require("fs");
const handler = require("./RetrieveTweets/RetrieveTweets");
const sendTweet = require("./sendTweets/sendTweets");
require("dotenv").config();

app.use(cors());
app.use(
  bodyParser.text({
    type: "*/*",
    limit: "50mb",
  })
);

app.get("/fetchTweets", async (req, res) => {
  try {
    const user = req.query.user;
    const days = req.query.days;
    const retweetCount = req.query.retweetCount;
    console.log("received", user, days, retweetCount);

    handler.retrieveTweets(user, retweetCount, days, null, (u) => {
      console.log("sending");
      res.send(u);
    });
  } catch (error) {
    console.log(error);
    res.send("try again please");
  }
});

app.post("/sendtweet", async (req, res) => {
  try {
    let tweet = req.body;
    sendTweet.sendTweet(tweet, () => {
      console.log("sent");
      res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
    console.log("error");
  }
});

module.exports.app = app;
