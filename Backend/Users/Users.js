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

function users(user, cb) {
  let users = [];
  try {
    oauth.get(
      `https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name=${user}&skip_status=true&include_user_entities=false`,
      process.env.AccessToken,
      process.env.TokenSecret,
      (e, response) => {
        if (e) {
        }
        if (response) {
          try {
            console.log(response);
            let data = JSON.parse(response);
            data.users.forEach((item) => {
              users.push({
                user: item.screen_name,
                followers_count: item.followers_count,
                verified: item.verified,
              });
            });
            cb(users);
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

module.exports.users = users;
