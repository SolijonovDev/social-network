import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { userchangeStatusThunk } from '../../../store/user-reducer';
import { useDispatch } from 'react-redux';

export default function StatusDialog({open,onClose}) {
 const [text,setText]=useState("")
 const dispatch=useDispatch()
 const handleClose=()=>{
     console.log("click");
     onClose()
     setText("")
 }
 const handleSave=()=>{
  if(text){
     dispatch(userchangeStatusThunk(text))
  }
  onClose()
  setText("")
}
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Status"
            type="text"
            fullWidth
            value={text}
            onChange={({target})=>setText(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
