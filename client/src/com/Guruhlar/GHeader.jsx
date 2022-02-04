import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PhoneIcon from "@material-ui/icons/Phone";
import MenuListComposition from "./Menu";
import {useSelector} from 'react-redux'
import { GuruhInfoDialog } from './Dialogs/GuruhInfo';
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
}));

export default function GHeader() {
  const {name,id}=useSelector(state => state.group)
  const [dialog,setDialog]=useState(false)
  const classes = useStyles();
  return (
    <div className={classes.top} xs={12}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item onClick={()=>setDialog(true)}>
          <Typography className={classes.text} variant="subtitle1">
           {name}
          </Typography>
          <Typography className={classes.subText} variant="subtitle2">
            {id}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton disabled aria-label="delete">
            <SearchIcon  color="primary" />
          </IconButton>
          <IconButton disabled aria-label="delete" color="primary">
            <PhoneIcon color="primary" />
          </IconButton>
          <MenuListComposition />
        </Grid>
      </Grid>
      <GuruhInfoDialog open={dialog} onClose={()=>setDialog(false)}/>
    </div>
  );
}
