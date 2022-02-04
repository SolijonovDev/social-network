import { Grid, IconButton, TextField, } from "@material-ui/core";
import React, { useState } from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { useDispatch, useSelector } from 'react-redux'
// import { dAddMessage } from "../../store/dialog-reducer";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
// import { useGFooter } from "./guruhlarStyle";
// import { guruhAddMessage, guruhChangeText } from "../../store/guruhlar-reducer";
// import { groupAddMessageThunk } from "../../store/group-reducer";
import { makeStyles } from '@material-ui/core/styles';
import { addPhotoChannelThunk, addTextChannelAc, channelAddMessageThunk } from "../../store/channel-reducer";

const useStyles = makeStyles(() => ({
  bottom: {
    color: "#fff",
    right: "0",
    left: "0",
    bottom: "0",
    position: "absolute",
    height: "55px",
    background: "#678983",
  },
  input: {
    display: 'none'
  },
  field: {
    fontSize: "16px",
    padding: "4px 15px",
    boxSizing: "border-box",
    marginTop: "8px",
    color: "#888",
    marginBottom: "-10px",
  }
}))


export default function Footer() {
  const { id,text } = useSelector(state => state.channel)
  const classes = useStyles();
  const dispatch = useDispatch()
  const handleChange = ({ target }) => {
    dispatch(addTextChannelAc(target.value))
  }
  const handlePhoto = ({ target }) => {
    debugger
    const formData = new FormData();
    formData.append(
      "img",
      target.files[0],
      target.files[0].name
    );
    dispatch(addPhotoChannelThunk(formData, id))
  }
  const addMessage = () => {
    if(text){
      dispatch(channelAddMessageThunk(text, id))
    }
  }
  return (
    <Grid item container xs={12} className={classes.bottom}>
      <Grid item xs={1}>
        <input onChange={handlePhoto} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AttachFileIcon />
          </IconButton>
        </label>
      </Grid>
      <Grid style={{ marginBottom: "-10px" }} item xs={8}>
        <TextField onChange={handleChange} value={text} className={classes.field} color="primary" fullWidth variant="standard" />
      </Grid>
      <Grid item xs={3}>
        <IconButton>
          <InsertEmoticonIcon color="primary" />
        </IconButton>
        <IconButton onClick={addMessage}>
          {!text ? (
            <MicNoneIcon color="primary" />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
}
