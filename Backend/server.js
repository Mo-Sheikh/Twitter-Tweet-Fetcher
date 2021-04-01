const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const fs = require("fs");
const handler = require("./RetrieveTweets/RetrieveTweets");
const sendTweet = require("./sendTweets/sendTweets");
const users = require("./Users/Users");
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

app.get("/getusers", async (req, res) => {
  console.log("HELLOO!");
  try {
    users.users("codewithmo", (listOfUsers) => {
      if (listOfUsers === "error") {
        res.send("error");
      } else {
        console.log(listOfUsers);
        res.send(listOfUsers);
      }
    });
  } catch (error) {
    console.log(error);
    console.log("ERROR getting users");
    res.send("try again please");
  }
});
module.exports.app = app;
