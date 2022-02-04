import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PhoneIcon from "@material-ui/icons/Phone";
import MenuListComposition from "./Menu";
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FriendProfile } from './FriendProfile';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  top: {
    right: "0",
    left: "0",
    top: "0px",
    position: "absolute",
    height: "45px",
    background: "#1F1D36",
    padding: "5px",
    color: "#fff",
  },
  text: {
    fontSize: "12px",
  },
  // cursorDisabled:{
  //   cursor:"no-drop"
  // }
}));

export default function DialogHeader() {
  const [open,setOpen]=useState(false)
  const {name,id}=useSelector(state => state.chat)
  const classes = useStyles();
  return (
    <div className={classes.top} xs={12}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item onClick={()=>setOpen(true)}>
          <Typography className={classes.text} variant="subtitle1">
           {name}
          </Typography>
          <Typography className={classes.subText} variant="subtitle2">
          {id}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete">
            <SearchIcon disabled color="primary" />
          </IconButton>
          <IconButton aria-label="delete" color="primary">
            <PhoneIcon disabled color="primary" />
          </IconButton>
          <MenuListComposition />
        </Grid>
        <FriendProfile open={open} onClose={()=>setOpen(false)}/>
      </Grid>
    </div>
  );
}
