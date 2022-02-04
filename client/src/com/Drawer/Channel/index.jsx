import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { createNewChannelThunk, newChannelPhotoUploadThunk } from '../../../store/channel-reducer';
import { Avatar } from '@material-ui/core';

export function NewChannelDialog({ open, onClose }) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const dispatch = useDispatch()
  const {newChannelPhoto}=useSelector(state=>state.channel)
  const src="http://localhost:7000/"+newChannelPhoto
  
  const handleClose = () => {
    console.log(name,status);
    onClose()
    setName("")
    setStatus("")
  }
  const handleSave = () => {
    if (name) {
      dispatch(createNewChannelThunk(name,status,newChannelPhoto))
    }
    console.log(name,status);
    onClose()
    setName("")
    setStatus("")
  }
  const onFileChange = event => {
   alert("newChannelPhotoUploadThunk");
    debugger
    const formData = new FormData();
    formData.append(
      "img",
      event.target.files[0],
      event.target.files[0].name
    );
    dispatch(newChannelPhotoUploadThunk(formData))
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Grid container xs={12} alignItems='center'>
            <Grid xs={12} gutterBottom style={{marginBottom:"20px"}}>
              <Typography align='center' variant='h6'>New Channel</Typography>
            </Grid>
            <Grid xs={4}>
              <input
              onChange={onFileChange}
               accept="image/*" 
               style={{display:"none"}} 
               id="icon-button-file-new-channel" 
               type="file" />
              <label htmlFor="icon-button-file-new-channel">
                <IconButton  color="primary" aria-label="upload picture" component="span">
                {
                    newChannelPhoto ?
                      <Avatar style={{width:"80px",height:"80px"}} alt="Remy Sharp" src={src} />
                      :
                      <PhotoCamera style={{width:"80px",height:"80px"}} />
                  }
                </IconButton>
              </label>
            </Grid>
            <Grid xs={8}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={({ target }) => setName(target.value)}
                fullWidth
              />
              <Grid>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Status"
                type="text"
                value={status}
                onChange={({ target }) => setStatus(target.value)}
                fullWidth
              />
              </Grid>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button disabled={!name} onClick={handleSave} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
