import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import { ListItemSecondaryAction } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import NameDialog from './Name';
import StatusDialog from './Status';
import { useSelector, useDispatch } from 'react-redux';
import { userFileUploadThunk } from '../../../store/user-reducer';


const useStyles = makeStyles({
  dialog:{
    minWidth:400
  },
  root: {
    margin: 0,
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color:grey[500],
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  large:{
   width:"100px",
   height:"100px"
  },
  photoBlock: {
    padding: "20px 40px",
    boxSizing:"border-box",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "darkblue"
  },
  btn: {
    padding: "5px 10px",
    width: "auto",
    margin: "15px 10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  }
});

export function SimpleDialog({ open, onClose }) {
  const {name,email,status,img}=useSelector(state=>state.user)
  const [file,setFile]=useState()
  const dispatch=useDispatch()
  const classes = useStyles();
  const [nameOpen, setNameOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  const handleListItemClick = (value) => {
    console.log('value dialog', value)
  };
  const handleOpenName = () => {
    setNameOpen(true)
  }
  const handleOpenStatus = () => {
    setStatusOpen(true)
  }
 const onFileChange = event => { 
    setFile(event.target.files[0])
  }; 
  const fileUpload=()=>{
    const formData = new FormData(); 
      formData.append( 
        "img", 
        file,
        file.name 
      ); 
    dispatch(userFileUploadThunk(formData))
    setFile()
  }
  return (
    <Dialog className={classes.dialog} onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
     <div>
     <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">Profile</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
    </MuiDialogTitle>
     </div>
      <div className={classes.photoBlock}>
        <Avatar alt="Remy Sharp"
           src={img?`http://localhost:7000/${img}`:null}
         className={classes.large} />
        <Button
          variant="contained"
          component="label"
          className={classes.btn}
        >
          Set Profile Photo
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            hidden
          />
        </Button>
        {file&&<Button  variant="contained"
          component="label"
          className={classes.btn} onClick={fileUpload}>Upload</Button>}
      </div>
      <List>
        <ListItem button onClick={() => handleListItemClick("gmail")}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary="Name" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={handleOpenName}>
              <CreateIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={() => handleListItemClick("gmail")}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={email} secondary="Email" />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick("gmail")}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={status} secondary="Status" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={handleOpenStatus}>
              <CreateIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <NameDialog open={nameOpen} onClose={() => setNameOpen(false)} />
      <StatusDialog open={statusOpen} onClose={() => setStatusOpen(false)} />
    </Dialog>
  );
}

