import { Grid, IconButton, TextField, } from "@material-ui/core";
import React, { useState } from "react";
import { useDialogField } from "./DialogsStyle";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { useDispatch } from 'react-redux'
import { dAddMessage } from "../../store/dialog-reducer";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import { useSelector } from 'react-redux';
import { sendMessageChatThunk, sendPhotoChatThunk, setTextChatAc } from "../../store/chat-reducer";

export default function DialogField() {
  const { text,chat_id } = useSelector(state => state.chat)
  const classes = useDialogField();
  const dispatch = useDispatch()
  const handleChange = ({ target }) => {
    dispatch(setTextChatAc(target.value))
  }
  const sendMessage = () => {
    dispatch(sendMessageChatThunk(text,chat_id))
    dispatch(setTextChatAc(""))
  }
  const handleFileUpload=({target})=>{
    debugger
    console.log(target);
    const formData = new FormData();
    formData.append(
      "img",
      target.files[0],
      target.files[0].name
    );
      dispatch(sendPhotoChatThunk(formData,chat_id))
      console.log(formData);
  }
  return (
    <Grid item container xs={12} className={classes.bottom}>
      <Grid item xs={1}>
        <input onChange={handleFileUpload}  accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AttachFileIcon />
          </IconButton>
        </label>
      </Grid>
      <Grid style={{ marginBottom: "-10px" }} item xs={8}>
        <TextField
          onChange={handleChange}
          value={text}
          className={classes.field}
          color="primary"
          fullWidth
          variant="standard" />
      </Grid>
      <Grid item xs={3}>
        <IconButton>
          <InsertEmoticonIcon color="primary" />
        </IconButton>
        <IconButton onClick={sendMessage}>
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
