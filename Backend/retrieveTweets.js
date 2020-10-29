const OAuth = require("oauth");
const moment = require("moment");
require("dotenv").config();
let tweets = [];
const oauth = new OAuth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.ConsumerKey,
  process.env.ConsumerSecret,
  "1.0A",
  null,
  "HMAC-SHA1"
);
let max;
function fetchTweets(user, max_id, retweetCount, days) {
  let tweets = [];
  let status;
  if (max_id == "") {
    status = "";
  } else {
    status = `&max_id=${max_id}`;
  }
  return new Promise((resolve) => {
    oauth.get(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${user}&count=2000&include_rts=false&exclude_replies=1&tweet_mode=extended${status}`,
      process.env.AccessToken,
      process.env.TokenSecret,
      (e, response) => {
        if (e) {
          console.log("error", e);
        }
        if (response) {
          let data = JSON.parse(response);
          resolve(data);
        }
      }
    );
  });
}

async function callback(data, user, retweetCount, days) {
  try {
    let max_id = getMaxId(data);
    collectTweets(data, user, retweetCount, days)
      .then((i) => {
        tweets.concat(i);
      })
      .catch((err) => {
        console.log(err);
      });

    if (max_id != max) {
      console.log(max_id);
      await fetchTweets(user, max_id, retweetCount, days);
      max = max_id;
    } else {
      return "complete";
    }
  } catch (error) {
    console.log(error);
  }
}

async function getMaxId(data) {
  try {
    let tmp;
    data.map((element, index) => {
      if (index == 0) {
        tmp = element.id;
      } else {
        if (tmp > element.id) {
          tmp = element.id;
        }
      }
    });

    return tmp;
  } catch (error) {
    console.log(error);
  }
}

function collectTweets(data, user, retweetCount, days) {
  let now = moment().toISOString();

  return data.filter((i) => {
    console.log(i.full_text);
    let isoDate = new Date(i.created_at);
    if (
      i.retweet_count > retweetCount &&
      moment(now).diff(moment(isoDate), "days") > days
    ) {
      return {
        retweetCount: i.retweet_count,
        user: user,
        tweet: i.full_text,
      };
    }
  });
}

function main() {
  fetchTweets("codewithmo", "", 1, 1, 100).then((data) => {
    tweets = data;
    let m = getMaxId(data);
    collectTweets(data);
    if (collectTweets != "complete") {
      console.log("here");
      fetchTweets("codewithmo", m, 30, 30);
    }
  });
}

main();
