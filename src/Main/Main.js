import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Main() {
  const [name, setName] = useState();
  const [days, setDays] = useState();
  const [retweetCount, setRetweetCount] = useState();
  const classes = useStyles();
  const getHandle = (event) => {
    setName(event.target.value);
  };
  const getDays = (event) => {
    setDays(event.target.value);
  };
  const getRetweets = (event) => {
    setRetweetCount(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    axios
      .get(
        `http://localhost:5000/tweets?user=${name}&days=${days}&retweetCount=${retweetCount}`
      )
      .then((i) => {
        console.log(i);
      });
  };

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={submit}
      >
        <div>
          <TextField
            required
            id="standard-required"
            label="Twitter Handle"
            onChange={getHandle}
          />
          <TextField
            id="standard-number"
            label="Days"
            type="number"
            onChange={getDays}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-number"
            label="Retweet Count"
            type="number"
            onChange={getRetweets}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
