import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Spinner from "../Spinner/Spinner.js";

export default function Main() {
  const [name, setName] = useState();
  const [days, setDays] = useState();
  const [next, setNext] = useState();
  const [chosen, setChosen] = useState("");
  const [display, setDisplay] = useState(null);
  const [display1, setDisplay1] = useState(null);
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
      return a.likelihood - b.likelihood;
    });
    let info = data.splice(data.length - 1, data.length - 1)[0];
    setChosen(info.tweet);
    if (info) {
      return (
        <p>
          Tweet: {info.tweet} <br />
          <br />
          Retweets: {info.retweetCount} <br />
          <br /> Success Chance: {info.likelihood.toFixed(2)}
          <br /> <br />
          Date: {info.date}
          <br /> <br />
          User: @{info.user}
        </p>
      );
    }
  };

  const tweet = () => {
    console.log("sending down ", chosen);
    axios({
      method: "post",
      url: "http://localhost:5000/sendtweet",
      data: chosen,
    })
      .then((i) => {
        alert("sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const select = () => {
    setDisplay1(
      <div>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            onInput={(e) => {
              e.preventDefault();
            }}
            style={{ width: "1582px", height: "205px" }}
          />
        </Form.Group>
        <Button onClick={tweet} style={{ float: "right" }}>
          Tweet
        </Button>
      </div>
    );
  };
  useEffect(() => {
    if (data && data.length > 0) {
      setDisplay(<div>{randomise()}</div>);
    } else if (name != undefined) {
      console.log("name is unde", name);
      setDisplay(
        <div>
          <p>Empty</p>
        </div>
      );
    }
  }, [data]);
  const submit = (event) => {
    event.preventDefault();
    setDisplay("");

    axios
      .get(
        `http://localhost:5000/fetchTweets?user=${name}&days=${days}&retweetCount=${retweetCount}`
      )
      .then((data) => {
        if (typeof data.data == "object") {
          console.log(data.data);
          setData(data.data);
        } else {
          setDisplay("That geezer dont exist");
        }
      })
      .catch((e) => {
        console.log(e);
        setDisplay("Oops, something went wrong. Please try again.");
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
              {display == "" ? <Spinner style={{ float: "right" }} /> : ""}
            </form>
          </Col>
        </Row>

        <br></br>

        <Row>
          <Col
            md={{ span: 6, offset: 6 }}
            style={{ marginLeft: "12%", marginRight: "10%", marginTop: "5%" }}
          >
            {display}
          </Col>
          {data.length > 1 ? (
            <div>
              <Button
                style={{ float: "right" }}
                variant="primary"
                onClick={() => {
                  setDisplay(<div>{randomise()}</div>);
                }}
              >
                Next
              </Button>
              <Button
                style={{ float: "right" }}
                variant="primary"
                onClick={select}
              >
                Select
              </Button>
            </div>
          ) : (
            ""
          )}
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>{display1}</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>{/* <h1> Top users</h1> */}</Col>
        </Row>
      </Container>
    </div>
  );
}
