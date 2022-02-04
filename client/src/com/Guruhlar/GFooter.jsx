import { Grid, IconButton, TextField, } from "@material-ui/core";
import { useState } from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { useDispatch } from 'react-redux'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import { useGFooter } from "./guruhlarStyle";
import { guruhChangeText } from "../../store/guruhlar-reducer";
import { groupAddMessageThunk, groupAddPhotoThunk } from "../../store/group-reducer";

export default function Footer({ id }) {
  const [value, setValue] = useState('')
  const classes = useGFooter();
  const dispatch = useDispatch()
  const handleChange = ({ target }) => {
    dispatch(guruhChangeText(target.value))
    setValue(target.value)
  }
  const addMessage = () => {
    dispatch(groupAddMessageThunk(value, id))
    setValue('')
  }
  const addPhoto = ({ target }) => {
    const formData = new FormData();
    formData.append(
      "img",
      target.files[0],
      target.files[0].name
    );
    dispatch(groupAddPhotoThunk(id,formData))
  }
  return (
    <Grid item container xs={12} className={classes.bottom}>
      <Grid item xs={1}>
        <input
          accept="image/*"
          onChange={addPhoto}
          className={classes.input}
          id="icon-button-file"
          type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AttachFileIcon />
          </IconButton>
        </label>
      </Grid>
      <Grid style={{ marginBottom: "-10px" }} item xs={8}>
        <TextField onChange={handleChange} value={value} className={classes.field} color="primary" fullWidth variant="standard" />
      </Grid>
      <Grid item xs={3}>
        <IconButton>
          <InsertEmoticonIcon color="primary" />
        </IconButton>
        <IconButton onClick={addMessage}>
          {!value ? (
            <MicNoneIcon color="primary" />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
}
