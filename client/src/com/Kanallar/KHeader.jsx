import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PhoneIcon from "@material-ui/icons/Phone";
import {useSelector} from 'react-redux'
import LongMenu from "../Dialogs/Menu";
import { useKheader } from "./kanallarStyle";
import { ChannelDialog } from './Dialogs/Channel';
import { useState } from "react";

export default function KHeader() {
  const [open,setOpen]=useState()
  const {name,id}=useSelector(state => state.channel)
  const classes = useKheader();
  return (
    <div className={classes.top} xs={12}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item onClick={()=>setOpen(true)}>
          <Typography className={classes.text} variant="subtitle2">
           {name}
          </Typography>
          <Typography className={classes.subText} variant="subtitle1">
            id:{id} 
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete">
            <SearchIcon disabled color="primary" />
          </IconButton>
          <IconButton aria-label="delete" color="primary">
            <PhoneIcon disabled color="primary" />
          </IconButton>
          <LongMenu />
        </Grid>
      </Grid>
      <ChannelDialog open={open} onClose={()=>setOpen(false)}/>
    </div>
  );
}
