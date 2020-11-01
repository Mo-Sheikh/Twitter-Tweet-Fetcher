import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Spinner from "../Spinner/Spinner.js";
import Twitter from "../Images/twitter.svg";
import MediaCard from "../Card/Card";
import UserTable from "../TopUsers/TopUsers";

export default function Main() {
  const [name, setName] = useState();
  const [days, setDays] = useState();
  const [chosen, setChosen] = useState(null);
  const [display, setDisplay] = useState(null);
  const [tweetBox, SetTweetBox] = useState(null);
  const [retweetCount, setRetweetCount] = useState();
  const [data, setData] = useState([]);
  const [copy, setCopy] = useState([]);
  const [characterCount, setCharacterCount] = useState();

  const getHandle = (event) => {
    setName(event.target.value);
  };
  const getDays = (event) => {
    setDays(event.target.value);
  };
  const getRetweets = (event) => {
    setRetweetCount(event.target.value);
  };

  const getTweet = () => {
    try {
      console.log(data);
      data.sort((a, b) => {
        return a.likelihood - b.likelihood;
      });
      let info = data.splice(data.length - 1, data.length - 1)[0];
      console.log("chosen", info);
      setChosen(info);

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
    } catch (error) {
      console.log(error);
    }
  };

  const select = () => {
    setCopy(chosen.tweet);
    setCharacterCount(chosen.tweet.length);
  };

  const validateInput = (event) => {
    event.preventDefault();
    setCopy(event.target.value);
    setCharacterCount(`Character Count: ${event.target.value.length}`);
  };
  const tweet = () => {
    console.log("sending down ", chosen);
    if (copy.length > 279) {
      alert("Charater limit exceeded");
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/sendtweet",
        data: copy,
      })
        .then((i) => {
          if (i.data == "done") {
            alert("sent");
          } else {
            alert("failed to send");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const copyUser = (name) => {
    setName(name);
  };
  useEffect(() => {
    if (data && data.length > 0) {
      getTweet();
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
    setChosen("");
    axios
      .get(
        `http://localhost:5000/fetchTweets?user=${name}&days=${days}&retweetCount=${retweetCount}`
      )
      .then((data) => {
        if (typeof data.data == "object") {
          console.log(data.data);
          setData(data.data);
        } else {
          setChosen(null);
          setDisplay("Something went wrong - try again");
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
            <h1>
              {" "}
              Tweet Fetcher{" "}
              <img
                src={Twitter}
                className="interestList"
                alt="list of options"
                type="checkbox"
                variant="secondary"
                style={{ marginRight: "2%" }}
              />{" "}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col style={{ textAlign: "center" }}>
            <form noValidate autoComplete="off" onSubmit={submit}>
              <div>
                <TextField
                  required
                  id="standard-start-adornment"
                  label="Twitter Handle"
                  value={name}
                  onInput={getHandle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  }}
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
                {chosen == "" ? <Spinner style={{ float: "right" }} /> : ""}
              </div>
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
            <MediaCard data={chosen} next={getTweet} select={select} />
          </Col>
          {data.length > 1 ? <div></div> : ""}
        </Row>
      </Container>
      <Container>
        <Row>
          <Row></Row>
          <Col>{tweetBox}</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }}>
            {" "}
            <div>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={copy}
                  onInput={validateInput}
                  style={{ width: "1182px", height: "205px" }}
                />
              </Form.Group>

              <p>{characterCount}</p>
              <Button variant="contained" color="primary" onClick={tweet}>
                Tweet
              </Button>
            </div>
          </Col>
          <Col style={{ marginLeft: "17%", width: "17%" }}>
            <UserTable select={copyUser} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
