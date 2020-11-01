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
      if (u == "error") {
        console.log(u);
        res.send("error");
      } else {
        res.send(u);
      }
    });
  } catch (error) {
    console.log(error);
    console.log("ERROR MATE in server");
    res.send("try again please");
  }
});

app.post("/sendtweet", async (req, res) => {
  try {
    let tweet = req.body;
    console.log("tweet is ", tweet);
    sendTweet.sendTweet(tweet, (i) => {
      console.log("nigga", i);
      if (i == "done") {
        res.send("done");
      } else {
        res.send("error");
      }
    });
  } catch (error) {
    console.log(error);
    console.log("error");
  }
});

module.exports.app = app;
