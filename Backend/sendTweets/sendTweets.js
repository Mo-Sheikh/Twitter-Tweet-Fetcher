const OAuth = require("oauth");
const moment = require("moment");
require("dotenv").config();
function sendTweet(tweet, cb) {
  const oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    process.env.ConsumerKey,
    process.env.ConsumerSecret,
    "1.0A",
    null,
    "HMAC-SHA1"
  );

  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json`,
    process.env.AccessToken,
    process.env.TokenSecret,
    { status: tweet },
    (e, data, response) => {
      if (response) {
      }
      if (data) {
        console.log("tweet sent");
        cb("done");
      }
      if (e) {
        console.log(e);
        cb("error");
      }
    }
  );
  return "done";
}

module.exports.sendTweet = sendTweet;
