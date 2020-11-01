import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 1009,
    marginLeft: "18%",
    marginTop: "-5%",
    marginBottom: "2%",
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { data, next, select } = props;
  if (data) {
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            {data.bannerImage == "" ? (
              ""
            ) : (
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                src={data.bannerImage}
                title="Contemplative Reptile"
              />
            )}

            <Typography gutterBottom variant="h6" component="h3">
              Tweet:
            </Typography>
            <br></br>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h6"
              style={{ fontSize: "0.8rem" }}
            >
              {data.tweet}
            </Typography>
            <br></br>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontSize: "0.8rem" }}
            >
              Retweets: {data.retweetCount}
            </Typography>
            <br></br>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontSize: "0.8rem" }}
            >
              Success Chance: {data.likelihood}%
            </Typography>
            <br></br>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontSize: "0.8rem" }}
            >
              Date: {data.date}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontSize: "0.8rem" }}
            >
              User: @{data.user}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={select}>
            Select
          </Button>
          <Button size="small" color="primary" onClick={next}>
            Next
          </Button>
        </CardActions>
      </Card>
    );
  } else {
    return null;
  }
}
