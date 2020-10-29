import React, { useState } from "react";
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
  const [data, setData] = useState();
  const [load, setLoad] = useState();
  const [retweetCount, setRetweetCount] = useState();

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
        `http://localhost:5000/fetchTweets?user=${name}&days=${days}&retweetCount=${retweetCount}`
      )
      .then((data) => {
        data.data.forEach((i) => {
          console.log(i);
        });
        let info = data.data[0];
        setData(
          <p>
            `Tweet: ${info.tweet} <br />
            <br />
            Retweets: ${info.retweetCount} <br />
            <br />
            Success Chance: ${info.likelihood}
            <br /> <br />
            Data: ${info.date}`
          </p>
        );
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                {load}
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>{data}</Col>
        </Row>
      </Container>
    </div>
  );
}
