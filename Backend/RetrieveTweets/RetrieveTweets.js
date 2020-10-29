const OAuth = require("oauth");
const moment = require("moment");
require("dotenv").config();
let tweets = [];
let max;
const oauth = new OAuth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.ConsumerKey,
  process.env.ConsumerSecret,
  "1.0A",
  null,
  "HMAC-SHA1"
);

function fetchTweets(user, retweetCount, days, max_id = null, cb) {
  try {
    let status = max_id ? `&max_id=${max_id}` : "";

    oauth.get(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${user}&count=2000&include_rts=false&exclude_replies=1&tweet_mode=extended${status}`,
      process.env.AccessToken,
      process.env.TokenSecret,
      (e, response) => {
        if (e) {
        }
        if (response) {
          let data = JSON.parse(response);

          handleResponse(data, user, retweetCount, days, cb);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getMaxId(data) {
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
  try {
    let now = moment().toISOString();
    let obj = [];

    data.forEach((i) => {
      let isoDate = new Date(i.created_at);
      if (
        i.retweet_count > retweetCount &&
        moment(now).diff(moment(isoDate), "days") > days
      ) {
        obj.push({
          retweetCount: i.retweet_count,
          user: user,
          tweet: i.full_text,
          likelihood: "10%",
        });
      }
    });
    return obj;
  } catch (error) {
    console.log(error);
  }
}

function handleResponse(data, user, retweetCount, days, cb) {
  try {
    let userTweets = collectTweets(data, user, retweetCount, days);

    tweets.push(...userTweets);

    let max_id = getMaxId(data);

    if (!max_id || max_id === max) {
      cb();
      return;
    } else {
      max = max_id;

      fetchTweets(user, retweetCount, days, max_id, cb);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchTweets("codewithmo", 1, 1, null, (u) => {
  console.log("udub", tweets);
});
