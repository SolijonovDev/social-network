import { Avatar, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { NewProfileDialog } from "./Dialogs/Profile";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "20px 0",
  },
  item: {
    color: "#fff",
    padding: "10px",
    background: "#666",
    boxSizing: "border-box",
    marginBottom: "5px 0",
    borderRadius: "8px 8px 0 8px",
  },
}));

export default function TheyMessages({ message }) {
  const [profile,setProfile]=useState(false)
  const classes = useStyles();
  return (
  <>
    <Grid
      item
      container
      xs={12}
      className={classes.root}
      justifyContent="flex-start"
      alignItems="flex-end"
    >
      <Avatar src={message.img?"http://localhost:7000/"+message.img:null} onClick={()=>setProfile(true)} />
      <Grid item xs={6} className={classes.item}>
        <Typography style={{wordWrap: "break-word"}}> {message.text}</Typography>
      </Grid>
    </Grid>
    <NewProfileDialog 
    id={message.user_id} 
    img={message.img}
    open={profile} 
    onClose={()=>setProfile(false)}/>
  </>
  );
}
