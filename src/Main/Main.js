import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { makeStyles } from "@material-ui/core/styles";

export default function Main() {
  const [name, setName] = useState();
  const [days, setDays] = useState();
  const [next, setNext] = useState();
  const [display, setDisplay] = useState(null);
  const [retweetCount, setRetweetCount] = useState();
  const [data, setData] = useState([]);

  const getHandle = (event) => {
    setName(event.target.value);
  };
  const getDays = (event) => {
    setDays(event.target.value);
  };
  const getRetweets = (event) => {
    setRetweetCount(event.target.value);
  };

  const randomise = () => {
    console.log(data);
    // let random = Math.ceil(Math.random() * (data.length - 1) + 0);
    data.sort((a, b) => {
      return b.likelihood - a.likelihood;
    });
    let info = data.splice(data.length - 1, data.length - 1)[0];

    if (info) {
      return (
        <p>
          Tweet: {info.tweet} <br />
          <br />
          Retweets: {info.retweetCount} <br />
          <br /> Success Chance: {Math.ceil(info.likelihood)}
          <br /> <br />
          Date: {info.date}
          <br /> <br />
          User: @{info.user}
        </p>
      );
    }
  };
  useEffect(() => {
    if (data) {
      setDisplay(<div>{randomise()}</div>);
    }
  }, [data]);
  const submit = (event) => {
    event.preventDefault();
    setDisplay("Please wait...");
    setData("");

    axios
      .get(
        `http://localhost:5000/fetchTweets?user=${name}&days=${days}&retweetCount=${retweetCount}`
      )
      .then((data) => {
        setData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h1> Tweet Fetcher</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <form noValidate autoComplete="off" onSubmit={submit}>
              <div>
                <TextField
                  required
                  id="standard-required"
                  label="Twitter Handle"
                  onChange={getHandle}
                />{" "}
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>{display}</Col>
          <Button
            variant="primary"
            onClick={() => {
              setDisplay(<div>{randomise()}</div>);
            }}
          >
            Next
          </Button>
        </Row>
      </Container>
    </div>
  );
}
