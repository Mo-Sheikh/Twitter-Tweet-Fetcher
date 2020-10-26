const OAuth = require("oauth");
const fs = require("fs");
const moment = require("moment");
require("dotenv").config();
var total = 0;
var previous = "";
let obj = new Set();

async function makeRequest(user, id = null, days, retweets) {
  let ids = [];
  let max_id;
}

  const oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    process.env.ConsumerKey,
    process.env.ConsumerSecret,
    "1.0A",
    null,
    "HMAC-SHA1"
  );
  return new Promise((resolve, reject) => {
    if (id) {
      max_id = `&max_id=${id}`;
    } else {
      max_id = "";
    }
    oauth.get(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${user}&count=5000&include_rts=false&exclude_replies=1&tweet_mode=extended&maxID=${max_id}`,
      process.env.AccessToken,
      process.env.TokenSecret,
      (e, data, response) => {
        if (e) {
          console.log(e);
        }
        if (
          data &&
          data.includes("full_text") &&
          JSON.parse(data)[0].full_text &&
          previous != JSON.parse(data)[0].full_text
        ) {
          let formattedData = JSON.parse(data);
          previous = formattedData[0].full_text;
          total += formattedData.length;
          try {
            let tweets = JSON.parse(data).map((i) => {
              ids.push(i.id);
              if (i.retweet_count > retweets) {
                let isoDate = new Date(i.created_at);
                let now = moment().toISOString();
                if (moment(now).diff(moment(isoDate), "days") > days) {
                  obj.add(
                    `${i.full_text}|-|${i.retweet_count}|-|@${user}|-|@${isoDate}`
                  );
                  return i;
                }
              }
            });
            resolve([
              obj,
              ids.sort((a, b) => {
                return a - b;
              })[0],
            ]);
          } catch (error) {
            console.log("error");
            console.log(error);
          }
          if (e) {
            console.log(e);
            reject(e);
          }
        } else {
          let tweets = Array.from(obj).map((i) => {
            return {
              tweet: i.split("|-|")[0],
              retweets: i.split("|-|")[1],
              user: i.split("|-|")[2],
              date: i.split("|-|")[3],
            };
          });
          console.log(`${user} has`, tweets.length);

          total += 4000;
          return;
        }
      }
    );
  });
}
async function fetchTweet(user, days, retweets) {
  const oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    process.env.ConsumerKey,
    process.env.ConsumerSecret,
    "1.0A",
    null,
    "HMAC-SHA1"
  );
  let id = null;
  let total = 0;
  let obj = [];
  do {
    if (id) {
      let request = await makeRequest(user, id, days, retweets).then((i) => {
        id = i[1];
      });
    } else {
      let request = await makeRequest(user, null, days, retweets).then((i) => {
        id = i[1];
      });
    }
  } while (total < 2000);
  console.log(`${user} has`, obj.length);
}

module.exports.handler = fetchTweet;
