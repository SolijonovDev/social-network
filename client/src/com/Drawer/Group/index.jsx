import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { userchangeNameThunk } from '../../../store/user-reducer';
import { Grid, Typography } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { createNewGroupThunk, newGroupPhotoUploadThunk } from '../../../store/group-reducer';
import { Avatar } from '@material-ui/core';

export function NewGroupDialog({ open, onClose }) {
  debugger
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const dispatch = useDispatch()
  const { newGroupPhoto } = useSelector(state => state.group)
  const src = "http://localhost:7000/" + newGroupPhoto;
  const handleClose = (e) => {
    onClose()
    setName("")
    setStatus("")
    onClose(e)
  }
  const handleCreate = (e) => {

    if(name){
      dispatch(createNewGroupThunk(name, status, newGroupPhoto))
    }
    setName("")
    setStatus("")
    onClose(e)
  }
  const onFileChangeGroup = event => {
    debugger
    alert("newGroupPhotoUploadThunk");
    const formData = new FormData();
    formData.append(
      "img",
      event.target.files[0],
      event.target.files[0].name
    );
    dispatch(newGroupPhotoUploadThunk(formData))
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Grid container xs={12} alignItems='center'>
            <Grid xs={12} gutterBottom style={{ marginBottom: "20px" }}>
              <Typography align='center' variant='h6'>New Group</Typography>
            </Grid>
            <Grid xs={4}>
              <input
                onChange={onFileChangeGroup}
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file-new-group"
                type="file" />
              <label htmlFor="icon-button-file-new-group">
                <IconButton  color="primary" aria-label="upload picture" component="span">
                  {
                    newGroupPhoto ?
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
          <Button disabled={!name} onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
