const OAuth = require("oauth");
const moment = require("moment");
require("dotenv").config();

const oauth = new OAuth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.ConsumerKey,
  process.env.ConsumerSecret,
  "1.0A",
  null,
  "HMAC-SHA1"
);

function handler(user, retweetCount, days, max_id = null, cb) {
  let tweets = [];

  let max;
  fetchTweets(user, retweetCount, days, (max_id = null), cb);
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
            try {
              console.log(response);
              let data = JSON.parse(response);

              handleResponse(data, user, retweetCount, days, cb);
            } catch (error) {
              console.log(error);
              cb("error");
            }
          }
        }
      );
    } catch (error) {
      console.log("error is ", error);
      console.log("ERROR MATE");
      return error;
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
      if (data[0] && data[0].user) {
        var location = data[0].user.location;
        var description = data[0].user.description;
        var profileImage = data[0].user.profile_image_url;
        var bannerImage = data[0].user.profile_banner_url;
      } else {
        var location = "";
        var description = "";
        var profileImage = "";
        var bannerImage = "";
      }
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
            likelihood: (i.retweet_count / i.user.followers_count) * 100,
            location: location,
            description: description,
            profileImage: profileImage,
            bannerImage: bannerImage,
            date: isoDate,
          });
        }
      });

      return obj;
    } catch (error) {
      console.log(error);
      console.log("error in here collect tweets");
      return false;
    }
  }

  function handleResponse(data, user, retweetCount, days, cb) {
    try {
      let userTweets = collectTweets(data, user, retweetCount, days);

      tweets.push(...userTweets);

      let max_id = getMaxId(data);

      if (!max_id || max_id === max) {
        cb(tweets);
        return;
      } else {
        max = max_id;

        fetchTweets(user, retweetCount, days, max_id, cb);
      }
    } catch (error) {
      console.log("error from previos don");
      return cb("error");
    }
  }
}

module.exports.retrieveTweets = handler;
