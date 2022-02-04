import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
const useStyles = makeStyles(() => ({
  root: {
    margin: "0",
  },
  item:{
      margin:"5px 0",
      color:"#fff",
      height:"auto",
      padding: "10px",
      background:"#999",
      boxSizing:"border-box",
      borderRadius:"8px 8px  8px 0"
  },
  img:{
    width:"100%",
    height:"100%"
  },
  text:{
    wordWrap: "break-word"
  }
}));

export default function MyMessages({ message }) {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      xs={12}
      className={classes.root}
      spacing={2}
      justifyContent="flex-end"
    >
      <Grid item xs={6} className={classes.item}>
       {message.text&& <Typography 
        className={classes.text}
        > 
        {message.text}
        </Typography>}
        {message.img&&<img
        className={classes.img}
         src={"http://localhost:7000/"+message.img}/>}
      </Grid>
    </Grid>
  );
}
