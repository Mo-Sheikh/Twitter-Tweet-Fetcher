const axios = require("axios");

axios
  .get(
    "https://www.meetup.com/api/?arg_offset=0&arg_token=pari&arg_language=en_US&method=getLocationMatches&arg_lat=0&arg_lon=-0"
  )
  .then((i) => {
    console.log(i);
  });
