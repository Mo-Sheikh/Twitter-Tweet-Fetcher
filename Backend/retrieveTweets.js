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
async function fetchTweets(user, max_id, retweetCount, days, limit = null) {
  try {
    let tweets = [];
    let status;
    let initialCall = `&count=5000`;
    if (max_id == "") {
      status = "";
    } else {
      status = `&max_id=${max_id}`;
    }

    oauth.get(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${user}&count=2000&include_rts=false&exclude_replies=1&tweet_mode=extended${status}`,
      process.env.AccessToken,
      process.env.TokenSecret,
      async (e, response) => {
        if (e) {
          console.log("error", e);
        }
        if (response) {
          let data = JSON.parse(response);
          callback(data, user, retweetCount, days, limit);
        }
      }
    );

    return tweets;
  } catch (error) {
    console.log(error);
  }
}

async function callback(data, user, retweetCount, days, limit) {
  let result = (resolve, reject) => {
    try {
      if (limit && tweets.length > limit) {
        console.log("Complete");
        console.log(tweets);
        resolve(tweets);
        return new Promise(result);
      }
      tweets = collectTweets(data, user, retweetCount, days);

      let max_id = getMaxId(data);
      if (max_id != max) {
        fetchTweets(user, max_id);
        max = max_id;
      } else {
        console.log("Complete");
        console.log(tweets);
        resolve(tweets);
        return new Promise(result);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  };
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

async function collectTweets(data, user, retweetCount, days) {
  let now = moment().toISOString();
  try {
    return data.filter((i) => {
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
  } catch (error) {
    console.log(error);
  }
}

async function run() {
  let b = await fetchTweets("codewithmo", "", 1, 1, 100);
  console.log(b);
}

run();
