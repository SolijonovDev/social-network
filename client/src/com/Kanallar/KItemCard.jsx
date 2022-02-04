import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles({
  root: {
    maxWidth: 380,
    marginBottom:"20px",
    background:"#6D8299"
  },
  media: {
    height: 240,
  },
});

export default function ItemCard({message}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
    {
      message.img&&<CardMedia
      className={classes.media}
      image={"http://localhost:7000/"+message.img}
      title='name'
    />
    }
      {
        message.text&&  <CardContent>
        <Typography gutterBottom variant="body1">
         {message.text}
        </Typography>
      </CardContent>
      }
      </CardActionArea>
      <CardActions>
        <VisibilityIcon/>
        <Typography>
          1
        </Typography>
      </CardActions>
    </Card>
  );
}
