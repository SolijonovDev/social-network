import { Avatar, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    margin: "10px 0",
  },
  item: {
    color: "#fff",
    padding: "10px",
    background: "#666",
    boxSizing: "border-box",
    margin: "0 10px",
    borderRadius: "8px 8px 0 8px",
  },
  photo:{
    width:"100%",
    height:"100%"
  }
}));

export default function HisMessage({ message }) {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      xs={12}
      className={classes.root}
      justifyContent="flex-start"
      alignItems="flex-end"
    >
      <Grid item xs={6} className={classes.item}>
     {message.text&&   <Typography> {message.text}</Typography>}
     {message.img&&<img className={classes.photo} src={"http://localhost:7000/"+message.img}/>}
      </Grid>
    </Grid>
  );
}
